<script lang="ts">
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import DataTableMain from '@/components/Mains/DataTableMain.vue';
import { defineComponent, ref } from 'vue';

import type { Option } from '@/models/Option'
import type { Customer } from '@/models/Customer'
import type { Application } from '@/models/Application'

import { CustomersService } from '@/services/CustomersService'
import { GenericFunctions } from '@/services/GenericFunctions';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import 'primeicons/primeicons.css'

import { FilterMatchMode } from 'primevue/api';

export default defineComponent(
    {
        components:{
            DataTableMain,
            DataTable,
            Column,
            InputText,
            Dropdown,
            Calendar,
            ButtonDefault
        },
        data() {
        return {
            pageTitle: ref('Aplicações'),
            
            modalActive: ref(false),
            modalMessage: ref(''),

            customer: ref({} as Customer),
            applications: ref([] as Application[]),

            loading: ref(true),
            filters: ref({
                id: { value: null, matchMode: FilterMatchMode.EQUALS },
                createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
                'plan.product': { value: null, matchMode: FilterMatchMode.EQUALS },
                status: { value: null, matchMode: FilterMatchMode.EQUALS },
                'plan.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                planPrice: { value: null, matchMode: FilterMatchMode.CONTAINS },
                additionalPrice: { value: null, matchMode: FilterMatchMode.CONTAINS },
                contractedLicenses: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                pricePerLicense: { value: null, matchMode: FilterMatchMode.CONTAINS },
                totalPrice: { value: null, matchMode: FilterMatchMode.CONTAINS },
                nextBillingDate: { value: null, matchMode: FilterMatchMode.DATE_IS }
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
                statusOptions: ref([{
                    key: 1,
                    value: 'Ativo'
                },
                {
                    key: 2,
                    value: 'Inativo'
                }
                ] as Option[])
            }
        },
        async mounted() {
            const clientId: any = this.$route.params.clientId;
        
            if (clientId && typeof clientId === 'string' && clientId.trim() !== '') {
                const decryptedId = GenericFunctions.decryptIdentifier(decodeURIComponent(clientId));
            
                await CustomersService.getAllCustomers().then((data: Customer[]) => { this.customer = data.filter((u: any) => u.id === decryptedId)[0] })
            }
        
            this.applications = this.getApplications(this.customer.applications);
        
            this.loading = false;
        },
        methods: {
            getApplications(data: any) {
                return [...(data || [])].map((a) => {
                    a.createdAt = new Date(a.createdAt);
                
                    a.totalPrice = GenericFunctions.formatMoney(a.planPrice + a.additionalPrice + (a.contractedLicenses * a.pricePerLicense));
                
                    a.planPrice = GenericFunctions.formatMoney(a.planPrice);
                    a.additionalPrice = GenericFunctions.formatMoney(a.additionalPrice);
                    a.pricePerLicense = GenericFunctions.formatMoney(a.pricePerLicense);
                
                    a.effectiveDate = new Date(a.effectiveDate);
                    a.nextBillingDate = new Date(a.nextBillingDate);
                
                    return a;
                });
            },
        
            onEditing(event: any) {
                this.$router.push(`/customers/register/apps/register/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
            },
        }
    });

</script>
<template>

    <div class="flex justify-end mt-5">
        <ButtonDefault class="flex bg-primary text-white rounded-lg" route="/customers/register/apps/register">
                <div class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
                Cadastrar Aplicação
        </ButtonDefault>
    </div>
    
    <DataTableMain>
        <DataTable v-model:filters="filters" :value="applications" stripedRows paginator
                    @row-edit-init="onEditing" :rowsPerPageOptions="[5, 10, 20, 50]"
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
                    :loading="loading" editMode="row" dataKey="id" :pt="{ table: { style: 'min-width: 50rem' } }">
                    <template #empty> Nenhum plano foi encontrado. </template>
                    <template #loading> Carregando planos... </template>

                    <Column field="id" header="Código" style="width: 8%; min-width:9rem">
                        <template #body="{ data }">
                            {{ data.id }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="number" @input="filterCallback()"
                                class="font-normal p-2" placeholder="ID" />
                        </template>
                    </Column>

                    <Column field="createdAt" header="Data de Criação" filterField="createdAt" dataType="date"
                        style="width: 15%; min-width:13rem">
                        <template #body="{ data }">
                            {{ GenericFunctions.formatDate(data.createdAt) }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false"
                                @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999"
                                inputClass="p-2" />
                        </template>
                    </Column>

                    <Column field="plan.product" header="Produto" :showFilterMenu="false" style="width: 15%">
                        <template #body="{ data }">
                            {{ data.plan.product }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <Dropdown v-model="filterModel.value" @change="filterCallback()"
                                :options="products.map(o => o.value)" placeholder="Selecionar" class="p-column-filter"
                                :showClear="true">
                                <template #option="slotProps">
                                    {{ slotProps.option }}
                                </template>
                            </Dropdown>
                        </template>
                    </Column>

                    <Column field="status" header="Status" :showFilterMenu="false" style="width: 15%">
                        <template #body="{ data }">
                            {{ data.status }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <Dropdown v-model="filterModel.value" @change="filterCallback()"
                                :options="statusOptions.map(o => o.value)" placeholder="Selecionar"
                                class="p-column-filter" :showClear="true">
                                <template #option="slotProps">
                                    {{ slotProps.option }}
                                </template>
                            </Dropdown>
                        </template>
                    </Column>

                    <Column field="plan.name" header="Plano" style="width: 15%; min-width:15rem">
                        <template #body="{ data }">
                            {{ data.plan.name }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                class="font-normal p-2" placeholder="Filtrar por plano" />
                        </template>
                    </Column>

                    <Column field="planPrice" header="Valor do Plano" style="width: 15%; min-width:10rem">
                        <template #body="{ data }">
                            {{ data.planPrice }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                class="font-normal p-2" placeholder="Valor" />
                        </template>
                    </Column>

                    <Column field="additionalPrice" header="Valor Adicional" style="width: 15%; min-width:10rem">
                        <template #body="{ data }">
                            {{ data.additionalPrice }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                class="font-normal p-2" placeholder="Valor" />
                        </template>
                    </Column>

                    <Column field="contractedLicenses" header="Licenças" style="width: 15%; min-width:10rem">
                        <template #body="{ data }">
                            {{ data.contractedLicenses }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                class="font-normal p-2" placeholder="Valor" />
                        </template>
                    </Column>

                    <Column field="pricePerLicense" header="Preço por Licença" style="width: 15%; min-width:10rem">
                        <template #body="{ data }">
                            {{ data.pricePerLicense }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                class="font-normal p-2" placeholder="Valor" />
                        </template>
                    </Column>

                    <Column field="totalPrice" header="Valor da Cobrança" style="width: 15%; min-width:10rem">
                        <template #body="{ data }">
                            {{ data.totalPrice }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                class="font-normal p-2" placeholder="Valor" />
                        </template>
                    </Column>

                    <Column field="nextBillingDate" header="Data próxima cobrança" filterField="nextBillingDate"
                        dataType="date" style="width: 15%; min-width:13rem">
                        <template #body="{ data }">
                            {{ GenericFunctions.formatDate(data.nextBillingDate) }}
                        </template>

                        <template #filter="{ filterModel, filterCallback }">
                            <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false"
                                @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999"
                                inputClass="p-2" />
                        </template>
                    </Column>

                    <Column header="Editar" :rowEditor="true" style="width: 1%;"></Column>
                </DataTable>
    </DataTableMain>
</template>