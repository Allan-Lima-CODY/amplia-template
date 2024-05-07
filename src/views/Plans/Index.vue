<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'
import type { Option } from '@/models/Option'
import type { Plans } from '@/models/Plans'
import { PlansService } from '@/services/PlansService'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { FilterMatchMode } from 'primevue/api';


library.add(faPlus, faArrowLeft, faEye, faEyeSlash)

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
      pageTitle: ref('Planos'),

      modalActive: ref(false),
      modalMessage: ref(''),

      messageModalSuccess: ref(''),
      messageModalWarning: ref(''),
      messageModalError: ref(''),
      modalSuccessActive: ref(false),
      modalWarningActive: ref(false),
      modalErrorActive: ref(false),

      toDelete: ref(0),

      plans: [] as Plans[],

      selectedPlans: null as any,
      loading: ref(true),
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
        product: { value: null, matchMode: FilterMatchMode.EQUALS },
        price: { value: null, matchMode: FilterMatchMode.CONTAINS }
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
    }
  },
  mounted() {
    PlansService.getAllPlans().then((data: Plans[]) => {
      this.plans = this.getPlans(data);
    })

    this.loading = false;
  },
  methods: {
    getPlans(data: any) {
      return [...(data || [])].map((d) => {
        d.createdAt = new Date(d.createdAt);
        d.price = GenericFunctions.formatMoney(d.price);

        return d;
      });
    },

    onEditing(event: any) {
      this.$router.push(`/plans/register/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
    },

    deleteRow(id: any) {
      this.plans = this.plans.filter(i => i.id != id);
    },

    toggleModal(modalType?: string, id?: any) {
      if (id !== null) {
        this.toDelete = id;
      }
      switch (modalType) {
        case 'warning':
          this.modalMessage = 'Deseja apagar essa funcionalidade?';
          break;
        case 'error':
          this.modalMessage = 'É necessário desvincular essa funcionalidade de um plano antes de apagá-la!';
          break;
        case 'success':
          this.modalMessage = 'Funcionalidade apagada com sucesso!';
          break;
        default:
          break;
      }
      this.modalActive = !this.modalActive;
    },
    
    toggleSuccessModal(id?: any) {
      if (id !== null) {
        this.messageModalSuccess = 'Funcionalidade excluida com sucesso!';
        this.deleteRow(id);
      }
      this.modalSuccessActive = !this.modalSuccessActive;
    },

    toggleErrorModal() {
      this.modalErrorActive = !this.modalErrorActive;
    },

    toggleWarningModal() {
      this.modalWarningActive = !this.modalWarningActive;
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

        <DataTable v-model:filters="filters" :value="plans" stripedRows paginator @row-edit-init="onEditing"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
          :loading="loading" :globalFilterFields="['id', 'plan', 'createdAt', 'product', 'price']" editMode="row"
          dataKey="id" :pt="{ table: { style: 'min-width: 50rem' } }">
          <template #empty> Nenhum plano foi encontrado. </template>
          <template #loading> Carregando planos... </template>

          <Column field="id" header="Código" style="width: 8%" >
            <template #body="{ data }">
              {{ data.id }}
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="font-normal p-2"
                placeholder="ID" />
            </template>
          </Column>

          <Column field="name" header="Plano" style="width: 15%">
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

          <Column field="product" header="Produto" :showFilterMenu="false" style="width: 15%">
            <template #body="{ data }">
              {{ data.product }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="products.map(o => o.value)"
                placeholder="Selecionar" class="p-column-filter" style="min-width: 10rem" :showClear="true">
                <template #option="slotProps">
                  {{ slotProps.option }}
                </template>
              </Dropdown>
            </template>
          </Column>

          <Column field="price" header="Preço Sugerido" style="width: 15%">
            <template #body="{ data }">
              {{ data.price }}
            </template>

            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                placeholder="Preço" />
            </template>
          </Column>

          <Column header="Editar" :rowEditor="true" style="width: 5%; min-width: 8rem"></Column>
          <Column style="width: 5%; min-width: 8rem" header="Excluir">
            <template #body="{ data }">
              <button v-on:click="toggleSuccessModal(data.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </template>
          </Column>
        </DataTable>

      </div>
    </div>

    <ModalBase :message="messageModalWarning" :modal-active="modalWarningActive" title="Aviso" border-color="#D3A034"
      background-color="#DDEFEB" @ok-click="toggleWarningModal">
      <template v-slot:slot1>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
            fill="white" stroke="white"></path>
        </svg>
      </template>
    </ModalBase>

    <ModalBase :message="messageModalSuccess" :modal-active="modalSuccessActive" title="Sucesso" border-color="#34D399"
      background-color="#DDEFEB" @ok-click="toggleSuccessModal">
      <template v-slot:slot1>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
            fill="white" stroke="white"></path>
        </svg>
      </template>
    </ModalBase>

    <ModalBase :message="messageModalError" :modal-active="modalErrorActive" title="Erro" border-color="#F87171"
      background-color="#F2E1E5" @ok-click="toggleErrorModal">
      <template v-slot:slot1>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
            fill="#ffffff" stroke="#ffffff"></path>
        </svg>
      </template>
    </ModalBase>
  </DefaultLayout>
</template>