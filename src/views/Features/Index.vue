<script setup lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">

import { GenericFunctions } from '@/services/GenericFunctions'
import { FeatureService } from '@/services/FeaturesService';
import { ModalService } from '@/services/ModalService';

import type { Feature } from '@/models/Feature';
import type { Option } from '@/models/Option';
import type { ModalInfo } from '@/models/ModalInfo';

import FeaturesRegister from '@/components/Forms/FeaturesRegister.vue';
import ModalBase from '@/components/Alerts/ModalBase.vue'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from 'primevue/api';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import DataTableMain from '@/components/Mains/DataTableMain.vue';

export default defineComponent({
  components: {},
  data() {
    const modalInfo: ModalInfo = reactive(ModalService.getFeatureModal());
    return {
      pageTitle: ref('Funcionalidades'),
      features: ref([] as Feature[]),
      loading: ref(true),
      
      modalInfo: ref({
        ...toRefs(modalInfo)
      }),

      modalActive: ref(false),

      toDelete: ref(0),

      products: ref([{
        key: 1,
        value: 'WMS'
      },
      {
        key: 2,
        value: 'CRM'
      }
      ] as Option[]),
      editingRows: ref([]),
      filters: ({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
        product: { value: null, matchMode: FilterMatchMode.EQUALS }
      }),
    }
  },
  mounted() {
    FeatureService.getAllFeatures().then((data: Feature[]) => {
      this.features = data;
    });

    this.loading = false;
  },
  methods: {
    deleteRow() {
      if(this.toDelete !== 0)
        this.features = this.features.filter(i => i.id != this.toDelete);
    },
    saveFeat(feat: Feature){
        if(feat.name !== '')
        {
          feat.id = this.features.length > 0 ? (this.features[this.features.length - 1].id) + 1 : 1;
          this.toggleModal('registered')
          this.features.push(feat);
        }
        else
        {
          this.toggleModal('emptyNameError')
        }
    },
    onRowEditSave(event: any) {
      let { newData, index } = event;
      if(newData.name !== '')
        this.features[index] = newData;
      else
        this.toggleModal('emptyNameError');
    },
    toggleModal(modalType?: string)
    {
      if(modalType !== undefined)
        this.modalInfo = ModalService.getFeatureModal(modalType);
      this.modalActive = !this.modalActive;
    },
    handleDelete(id: any){
      if(id !== undefined){
        this.toDelete = id;
      }
      this.toggleModal('warning')
    },
    handleModalOk() 
    {
        if(this.modalInfo.title === 'Alerta')
        {
          if(this.toDelete !== 1)
          {
            this.modalActive = !this.modalActive;
            this.deleteRow();
            this.toDelete = 0;
            this.toggleModal('success');
          }
          else
          {
            this.toDelete = 0;
            this.modalActive = !this.modalActive;
            this.toggleModal('linkedPlanError');
          }
        }
        else{
          this.toggleModal()
        }
    },
    cancelDelete()
    {
        this.toDelete = 0
        this.modalActive = !this.modalActive;
    },
  },
  }
);
</script>

<template>
  <DefaultLayout>

    <TitlePageDefault :pageTitle="pageTitle"/>

    <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />
    <FeaturesRegister @register="saveFeat" :products="products" />
    <DataTableMain>
      <DataTable v-model:editingRows="editingRows" v-model:filters="filters" :value="features" stripedRows paginator
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
        :loading="loading" :globalFilterFields="['name', 'createdAt', 'product']" editMode="row" dataKey="id" :pt="{
          table: { style: 'min-width: 50rem' },
          column: {
            bodycell: ({ state }: any) => ({
              style: state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem'
            })
          }
        }" @row-edit-save="onRowEditSave">
        <template #empty> Nenhuma funcionalidade foi encontrada. </template>
        <template #loading> Buscando funcionalidades... </template>

        <Column field="id" header="Código" style="width: 5%">
          <template #body="{ data }">
            {{ data.id }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="font-normal p-2"
              placeholder="ID" />
          </template>
        </Column>
        <Column field="name" header="Nome da Funcionalidade" style="width: 15%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" class="p-2" />
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
              placeholder="Filtrar por nome" />
          </template>
        </Column>

        <Column field="product" header="Produto" style="width: 15%">
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
        <Column field="createdAt" header="Data de Inclusão" filterField="createdAt" dataType="date" style="width: 15%">
          <template #body="{ data }">
            {{ GenericFunctions.formatDate(data.createdAt) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Calendar v-model="filterModel.value" @date-select="filterCallback()" dateFormat="dd/mm/yy" :manual-input="false"
              placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
          </template>
        </Column>
        <Column header="Editar" :rowEditor="true" style="width: 5%; min-width: 8rem;" />
        <Column header="Excluir" style="width: 5%; min-width: 8rem; text-align: left" >
          <template #body="{ data }">
            <button v-on:click="handleDelete(data.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>
          </template>
        </Column>
      </DataTable>
    </DataTableMain>


    <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title" :border-color="modalInfo.borderColor"
     :okTitle="modalInfo.okTitle" :noTitle="modalInfo.noTitle" @ok-click="handleModalOk" @no-click="cancelDelete"/>
  </DefaultLayout>
</template>
