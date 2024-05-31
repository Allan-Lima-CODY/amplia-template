<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>
<script lang="ts">
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import DataTableMain from '@/components/Mains/DataTableMain.vue';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { FilterMatchMode } from 'primevue/api';


import type { Log } from '@/models/Log';
import type { MenuItem } from 'primevue/menuitem';
import type { Action } from '@/models/Action';
import type { Customer } from '@/models/Customer';
import type { User } from '@/models/User';

import { CustomersService } from '@/services/CustomersService';
import { ActionsService } from '@/services/ActionsService';
import { LogService } from '@/services/LogService'; 
import { GenericFunctions } from '@/services/GenericFunctions';
import { MenuItemsService } from '@/services/MenuItemsService';
import { UserService } from '@/services/UsersService';

export default defineComponent({
    data() {
        return{
            loading: ref(true),
            logs: ref([] as Log[]),
            pages: ref(MenuItemsService.getMenuItems().filter(i => i.label != 'Início') as MenuItem[]),
            actions: ref(ActionsService.getActions() as Action[]),
            customers: ref([] as Customer[]),
            users: ref([] as User[]),
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
        CustomersService.getAllCustomers().then((data : Customer[]) => {
            this.customers = data
        });
        UserService.getAllUsers().then((data : User[]) => {
            this.users = data
        })
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
            :loading="loading" :globalFilterFields="['id', 'dateHour', 'user', 'customer', 'action', 'page', 'info']" >
                <template #header>
                    <div class="flex justify-end mt-3">
                        <div class="flex gap-1 rounded-lg p-2 dark:bg-[#09090b]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <InputText class="p-2 rounded-l-none" v-model="filters['global'].value" placeholder="Pesquisa por palavra chave" />
                        </div>
                    </div>
                </template>
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
                        <Calendar v-model="filterModel.value" @date-select="filterCallback()" dateFormat="dd/mm/yy"
                        placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
                    </template>
                </Column>
                <Column header="Usuário" field="user">
                    <template #body="{ data }">
                      {{ data.user }}
                    </template>

                    <template #filter="{ filterModel, filterCallback }">
                      <Dropdown v-model="filterModel.value" editable @change="filterCallback()" :options="users.map(o => o.name)"
                        placeholder=" Selecionar" class="p-column-filter" input-class="w-full p-2" style="min-width: 10rem" :showClear="true">
                        <template #option="slotProps">
                          {{ slotProps.option }}
                        </template>
                      </Dropdown>
                    </template>
                </Column>
                <Column header="Cliente" field="customer">
                    <template #body="{ data }">
                      {{ data.customer }}
                    </template>

                    <template #filter="{ filterModel, filterCallback }">
                      <Dropdown v-model="filterModel.value" editable @change="filterCallback()" :options="customers.map(o => o.name)"
                        placeholder=" Selecionar" class="p-column-filter" input-class="w-full p-2" style="min-width: 10rem" :showClear="true">
                        <template #option="slotProps">
                          {{ slotProps.option }}
                        </template>
                      </Dropdown>
                    </template>
                </Column>
                <Column header="Ação" field="action">
                    <template #body="{ data }">
                      {{ data.action }}
                    </template>

                    <template #filter="{ filterModel, filterCallback }">
                      <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="actions.map(o => o.name)"
                        placeholder=" Selecionar" class="p-column-filter" style="min-width: 10rem" :showClear="true">
                        <template #option="slotProps">
                          {{ slotProps.option }}
                        </template>
                      </Dropdown>
                    </template>
                </Column>
                <Column header="Página" field="page">
                    <template #body="{ data }">
                      {{ data.page }}
                    </template>

                    <template #filter="{ filterModel, filterCallback }">
                      <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="pages.map(o => o.label)"
                        placeholder="Selecionar" class="p-column-filter" style="min-width: 10rem" :showClear="true">
                        <template #option="slotProps">
                          {{ slotProps.option }}
                        </template>
                      </Dropdown>
                    </template>
                </Column>
                <Column header="Informação" field="info">
                    <template #body="{ data }">
                      {{ data.info }}
                    </template>
                
                    <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Info" />
                    </template>
                </Column>
            </DataTable>
        </DataTableMain>
    </DefaultLayout>
</template>