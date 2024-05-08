<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>
<script lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataTableMain from '@/components/Mains/DataTableMain.vue';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { FilterMatchMode } from 'primevue/api';

import type { Log } from '@/models/Log';

import { LogService } from '@/services/LogService';
import { GenericFunctions } from '@/services/GenericFunctions';

export default defineComponent({
    data(){
        return{
            loading: ref(true),
            logs: ref([] as Log[]),
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                id: { value: null, matchMode: FilterMatchMode.EQUALS },
                dateHour: { value: null, matchMode: FilterMatchMode.DATE_IS },
                user: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                action: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                page: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                info: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
        }
    },
    mounted(){
        LogService.getAllLogs().then((data : Log[]) => {
            this.logs = data
        });
        this.loading = false;
    }
});
</script>
<template>
    <DefaultLayout>
        <TitlePageDefault pageTitle="Logs"/>
        <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />
        <DataTableMain>
            <DataTable stripedRows paginator :value="logs" v-model:filters="filters"  :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
        :loading="loading" :globalFilterFields="['name', 'createdAt', 'product']" >
                <Column header="Id" field="id" style="width: 10%">
                    <template #body="{ data }">
                        {{ data.id }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="font-normal p-2"
                        placeholder="ID" />
                    </template>
                </Column>
                <Column header="Data e hora" field="dateHour" filterField="dateHour" dataType="date">
                    <template #body="{ data }">
                        {{ GenericFunctions.formatDateTime(data.dateHour) }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <Calendar v-model="filterModel.value" @input="filterCallback()" dateFormat="dd/mm/yy"
                        placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
                    </template>
                </Column>
                <Column header="Usuário" field="user">
                    <template #body="{ data }">
                      {{ data.user }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Filtrar por usuário" />
                    </template>
                </Column>
                <Column header="Cliente" field="customer">
                    <template #body="{ data }">
                      {{ data.customer }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Filtrar por cliente" />
                    </template></Column>
                <Column header="Ação" field="action">
                    <template #body="{ data }">
                      {{ data.action }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Filtrar por ação" />
                    </template>
                </Column>
                <Column header="Página" field="page">
                    <template #body="{ data }">
                      {{ data.page }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Filtrar por página" />
                    </template>
                </Column>
                <Column header="Informação" field="info">
                    <template #body="{ data }">
                      {{ data.info }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Filtrar por informação" />
                    </template>
                </Column>
            </DataTable>
        </DataTableMain>
    </DefaultLayout>
</template>