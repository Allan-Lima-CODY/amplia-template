<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'
import type { Option } from '@/models/Option'
import type { Clients } from '@/models/Client'
import { ClientsService } from '@/services/ClientsService'
import type { Application } from '@/models/Application'
import { ApplicationService } from '@/services/ApplicationService'
import type { ModalInfo } from '@/models/ModalInfo'
import { ModalService } from '@/services/ModalService'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import { FilterMatchMode } from 'primevue/api';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)

export default defineComponent({
  components: {
    ButtonDefault,
    ModalBase,
    DataTable,
    Column,
    InputText,
    Dropdown,
    Calendar
  },
  data() {
    return {
      pageTitle: ref('Clientes'),

      modalActive: ref(false),
      modalMessage: ref(''),

      clients: [] as Clients[],

      loading: ref(true),
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        product: { value: null, matchMode: FilterMatchMode.EQUALS },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
      },

      products: [{
        key: 1,
        value: 'WMS'
      },
      {
        key: 2,
        value: 'CRM'
      }
      ] as Option[],

      expandedRows: {} as any
    }
  },
  mounted() {
    ClientsService.getAllClient().then((data: Clients[]) => {
      this.clients = this.getClients(data);
    })

    this.loading = false;
  },
  methods: {
    getClients(data: any) {
      return [...(data || [])].map((d) => {
        d.createdAt = new Date(d.createdAt);

        d.application.map((a: any) => {
          a.createdAt = new Date(a.createdAt);

          a.planPrice = GenericFunctions.formatMoney(a.planPrice);
          a.additionalPrice = GenericFunctions.formatMoney(a.additionalPrice);
          a.pricePerLicense = GenericFunctions.formatMoney(a.pricePerLicense);

          a.effectiveDate = new Date(a.effectiveDate);
          a.nextBillingDate = new Date(a.nextBillingDate);
        })

        return d;
      });
    },

    collapseAll() {
      this.expandedRows = null;
    },

    onEditing(event: any) {
      this.$router.push(`/plans/register/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
    },
  }
});
</script>

<template>
  <DefaultLayout>

    <TitlePageDefault :pageTitle="pageTitle">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6 me-4 mt-1">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
      </svg>
    </TitlePageDefault>

    <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />

    <div class="flex justify-end mt-6">
      <ButtonDefault class="flex bg-primary text-white rounded-lg" route="/plans/register">
        <div class="mr-2">
          <font-awesome-icon :icon="['fas', 'plus']" size="sm" style="color: #FFFFFF;" />
        </div>
        Cadastrar Plano
      </ButtonDefault>
    </div>

    <div class="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-6">
      <div class="max-w-full rounded-lg overflow-x-auto">

        <DataTable v-model:expandedRows="expandedRows" v-model:filters="filters" :value="clients" stripedRows paginator
          @row-edit-init="onEditing" :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
          :loading="loading" :globalFilterFields="['id', 'plan', 'createdAt', 'product', 'price']" editMode="row"
          dataKey="id" :pt="{ table: { style: 'min-width: 50rem' } }">
          <template #empty> Nenhum plano foi encontrado. </template>
          <template #loading> Carregando planos... </template>
          <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
              <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
            </div>
          </template>

          <Column field="id" header="Código" style="width: 8%">
            <template #body="{ data }">
              {{ data.id }}
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="font-normal p-2"
                placeholder="ID" />
            </template>
          </Column>

          <Column field="name" header="Cliente" style="width: 15%">
            <template #body="{ data }">
              {{ data.name }}
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                placeholder="Filtrar por nome" />
            </template>
          </Column>

          <Column field="createdAt" header="Data de Criação" filterField="createdAt" dataType="date" style="width: 15%">
            <template #body="{ data }">
              {{ GenericFunctions.formatDate(data.createdAt) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false"
                @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
            </template>
          </Column>

          <template #expansion="slotProps">
            <div class="p-3">
              <DataTable :value="slotProps.data.application">
                <Column field="effectiveDate" header="Data de Vigência" sortable>
                  <template #body="data">
                    {{ GenericFunctions.formatDate(data.data.effectiveDate) }}
                  </template>
                </Column>
                <Column field="nextBillingDate" header="Data Próxima Cobrança" sortable>
                  <template #body="data">
                    {{ GenericFunctions.formatDate(data.data.nextBillingDate) }}
                  </template>
                </Column>
                <Column field="planPrice" header="Valor de Cobrança" sortable>
                  <template #body="data">
                    {{ GenericFunctions.formatMoney(data.data.planPrice) }}
                  </template>
                </Column>
                <Column field="contractedLicenses" header="Licenças Contratadas" sortable>
                  <template #body="data">
                    {{ data.data.contractedLicenses }}
                  </template>
                </Column>
                <Column field="pricePerLicense" header="Valor por Licença" sortable>
                  <template #body="data">
                    {{ GenericFunctions.formatMoney(data.data.pricePerLicense) }}
                  </template>
                </Column>
                <Column field="product" header="Produto" sortable>
                  <template #body="data">
                    {{ data.data.plan.product }}
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>

          <Column header="Editar" :rowEditor="true" style="width: 5%; min-width: 8rem"></Column>
        </DataTable>

      </div>
    </div>
  </DefaultLayout>
</template>