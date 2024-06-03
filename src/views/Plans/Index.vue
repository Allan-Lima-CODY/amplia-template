<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue'

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
import type { ModalInfo } from '@/models/ModalInfo'
import { ModalService } from '@/services/ModalService'

import { FilterMatchMode } from 'primevue/api';

import DataTableMain from '@/components/Mains/DataTableMain.vue'
import { UserService } from '@/services/UsersService'


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
    const modalInfo: ModalInfo = reactive(ModalService.getPlansModal());
    return {
      pageTitle: ref('Planos'),

      modalActive: ref(false),
      modalMessage: ref(''),

      modalInfo: ref({
        ...toRefs(modalInfo)
      }),

      toDelete: ref(0),

      plans: ref([] as Plans[]),

      loading: ref(true),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
        product: { value: null, matchMode: FilterMatchMode.EQUALS },
        price: { value: null, matchMode: FilterMatchMode.CONTAINS }
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

    deleteRow() {
      this.plans = this.plans.filter(i => i.id != this.toDelete);
    },

    toggleModal(modalType?: string, id?: any) {
      if (id !== undefined) {
        this.toDelete = id;
      }
      if (modalType !== undefined)
        this.modalInfo = ModalService.getPlansModal(modalType);
      this.modalActive = !this.modalActive;
    },
    handleModalOk() {
      if (this.modalInfo.title === 'Alerta') {
        this.modalActive = !this.modalActive;
        this.deleteRow();
        this.toDelete = 0;
        this.toggleModal('success');
      }
      else {
        this.toggleModal()
      }
    },
    cancelDelete() {
      this.toDelete = 0
      this.modalActive = !this.modalActive;
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

    <div v-if="UserService.getUserPermissions().includePlans" class="flex justify-end mt-6">
      <ButtonDefault label="Cadastrar Plano" class="flex bg-primary text-white rounded-lg" route="/plans/register">
        <div class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </ButtonDefault>
    </div>

    <DataTableMain>
      <DataTable v-model:filters="filters" :value="plans" stripedRows paginator @row-edit-init="onEditing"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
        :loading="loading" :globalFilterFields="['id', 'plan', 'createdAt', 'product', 'price']" editMode="row"
        dataKey="id" :pt="{ table: { style: 'min-width: 50rem' } }">
        <template #empty> Nenhum plano foi encontrado. </template>
        <template #loading> Carregando planos... </template>

        <Column field="id" header="Código" style="width: 8%">
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

        <Column v-if="UserService.getUserPermissions().editPlans" header="Editar" :rowEditor="true" style="width: 5%; min-width: 8rem"></Column>
        <Column v-if="UserService.getUserPermissions().deletePlans" style="width: 5%; min-width: 8rem" header="Excluir">
          <template #body="{ data }">
            <button v-on:click="toggleModal('warning', data.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </template>
        </Column>
      </DataTable>
    </DataTableMain>

    <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
      :okTitle="modalInfo.okTitle" :noTitle="modalInfo.noTitle" :border-color="modalInfo.borderColor"
      @ok-click="handleModalOk" @no-click="cancelDelete" />
  </DefaultLayout>
</template>