<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'
import type { Option } from '@/models/Option'
import type { Customer } from '@/models/Customer'
import { CustomersService } from '@/services/CustomersService'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'

import { FilterMatchMode } from 'primevue/api';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)

export default defineComponent({
  components: {
    ButtonDefault,
    DataTable,
    Column,
    InputText,
    Calendar
  },
  data() {
    return {
      pageTitle: ref('Clientes'),

      modalActive: ref(false),
      modalMessage: ref(''),

      customers: ref([] as Customer[]),

      loading: ref(true),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        product: { value: null, matchMode: FilterMatchMode.EQUALS },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS }
      }),

      products: ref([{
        key: 1,
        value: 'WMS'
      },
      {
        key: 2,
        value: 'CRM'
      }
      ] as Option[]),

      expandedRows: ref({} as any)
    }
  },
  mounted() {
    CustomersService.getAllCustomers().then((data: Customer[]) => {
      this.customers = this.getCustomers(data);
    })

    this.loading = false;
  },
  methods: {
    getCustomers(data: any) {
      return [...(data || [])].map((d) => {
        d.createdAt = new Date(d.createdAt);

        d.applications.map((a: any) => {
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
      this.$router.push(`/customers/register/generalInfo/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
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
            <div class="flex justify-end">
              <div class="bg-transparent rounded-lg flex justify-end transition hover:bg-primary">
                <Button text icon="pi pi-minus" label="Fechar Todos" @click="collapseAll" class="p-3" />
              </div>
            </div>
          </template>

          <Column expander style="width: 1%" />

          <Column field="id" header="Código" style="width: 8%">
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="font-normal p-2"
                placeholder="ID" />
            </template>
          </Column>

          <Column field="name" header="Cliente" style="width: 15%">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                placeholder="Filtrar por nome" />
            </template>
          </Column>

          <Column field="createdAt" header="Data de Criação" filterField="createdAt" dataType="date" style="width: 15%">
            <template #body="slotProps">
              {{ GenericFunctions.formatDate(slotProps.data.createdAt) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false"
                @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
            </template>
          </Column>

          <Column header="Editar" :rowEditor="true" style="width: 1%;"></Column>

          <template #expansion="slotProps">
            <DataTable :value="slotProps.data.applications">
              <Column field="effectiveDate" header="Data de Vigência" header-class="text-yellow-400">
                <template #body="slotProps">
                  {{ GenericFunctions.formatDate(slotProps.data.effectiveDate) }}
                </template>
              </Column>
              <Column field="nextBillingDate" header="Data Próxima Cobrança" header-class="text-yellow-400">
                <template #body="slotProps">
                  {{ GenericFunctions.formatDate(slotProps.data.nextBillingDate) }}
                </template>
              </Column>
              <Column field="planPrice" header="Valor de Cobrança" header-class="text-yellow-400">
                <template #body="slotProps">
                  {{ slotProps.data.planPrice }}
                </template>
              </Column>
              <Column field="contractedLicenses" header="Licenças Contratadas" header-class="text-yellow-400">
                <template #body="slotProps">
                  {{ slotProps.data.contractedLicenses }}
                </template>
              </Column>
              <Column field="pricePerLicense" header="Valor por Licença" header-class="text-yellow-400">
                <template #body="slotProps">
                  {{ slotProps.data.pricePerLicense }}
                </template>
              </Column>
              <Column field="product" header="Produto" header-class="text-yellow-400">
                <template #body="slotProps">
                  {{ slotProps.data.plan.product }}
                </template>
              </Column>
            </DataTable>
          </template>
        </DataTable>

      </div>
    </div>
  </DefaultLayout>
</template>