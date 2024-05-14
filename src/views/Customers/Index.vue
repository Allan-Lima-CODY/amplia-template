<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'
import type { Option } from '@/models/Option'
import type { Customer } from '@/models/Customer'
import { CustomersService } from '@/services/CustomersService'
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

      customers: [] as Customer[],

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
    CustomersService.getAllClient().then((data: Customer[]) => {
      this.customers = this.getClients(data);
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

    <TitlePageDefault :pageTitle="pageTitle"/>

    <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />

    <div class="flex justify-end mt-6">
      <ButtonDefault label="Cadastrar novo cliente" class="flex bg-primary text-white rounded-lg" route="/customers/register/generalInfo">
        <div class="mr-2">
          <font-awesome-icon :icon="['fas', 'plus']" size="sm" style="color: #FFFFFF;" />
        </div>
      </ButtonDefault>
    </div>

    <div class="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-6">
      <div class="max-w-full rounded-lg overflow-x-auto">

        <DataTable v-model:expandedRows="expandedRows" v-model:filters="filters" :value="customers" stripedRows paginator
          @row-edit-init="onEditing" :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
          :loading="loading" :globalFilterFields="['id', 'plan', 'createdAt', 'product', 'price']" editMode="row"
          dataKey="id" :pt="{ table: { style: 'min-width: 50rem' } }">
          <template #empty> Nenhum plano foi encontrado. </template>
          <template #loading> Carregando planos... </template>
          <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
              <button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
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