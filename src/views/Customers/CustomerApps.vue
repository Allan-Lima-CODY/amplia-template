<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue';

import ModalBase from '@/components/Alerts/ModalBase.vue';
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import DataTableMain from '@/components/Mains/DataTableMain.vue';

import type { Option } from '@/models/Option'
import type { Application } from '@/models/Application'

import { CustomersService } from '@/services/CustomersService'
import { GenericFunctions } from '@/services/GenericFunctions';
import useFormDataService from '@/services/FormDataService';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import 'primeicons/primeicons.css'

import { FilterMatchMode } from 'primevue/api';
import { useFormDataStore } from '@/stores/formData';
import type { ModalInfo } from '@/models/ModalInfo';
import { ModalService } from '@/services/ModalService';
import { UserService } from '@/services/UsersService';

export default defineComponent(
    {
        components: {
            ModalBase,
            DataTableMain,
            DataTable,
            Column,
            InputText,
            Dropdown,
            Calendar,
            ButtonDefault
        },
        data() {
            const modalInfo: ModalInfo = reactive(ModalService.getAppsModal());
            return {
                GenericFunctions,
                pageTitle: ref('Aplicações'),

                modalInfo: {
                    ...toRefs(modalInfo)
                },
                modalActive: ref(false),

                applications: [] as any[],
                storeApps: useFormDataStore().arrayData as Application[],

                toDelete: 0,

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
            const customerId: any = this.$route.params.id;
            const formDataStore = useFormDataStore();
            if (customerId && typeof customerId === 'string' && customerId.trim() !== '') {
                const decryptedId = GenericFunctions.decryptIdentifier(decodeURIComponent(customerId));
                if (formDataStore.lastId !== decryptedId) {
                    const customer = (await CustomersService.getAllCustomers()).find(c => c.id === decryptedId);
                    if (customer?.applications !== undefined) {
                        formDataStore.resetArray();
                        formDataStore.updateArrayData(customer?.applications);
                        formDataStore.updateLastId(decryptedId);
                    }
                }
            } else {
                if (formDataStore.lastId !== 0)
                    formDataStore.resetArray();
                formDataStore.updateLastId(0);
            }
            this.applications = this.getApplications(formDataStore.arrayData);
            this.loading = false;
        },
        methods: {
            toggleModal() {
                this.modalActive = !this.modalActive;
            },
            getApplications(data: Application[]) {
                return (data || []).map((a: any) => {
                    return {
                        ...a,
                        createdAt: new Date(a.createdAt),
                        totalPrice: GenericFunctions.formatMoney(a.planPrice + a.additionalPrice + (a.contractedLicenses * a.pricePerLicense)),
                        planPrice: GenericFunctions.formatMoney(a.planPrice),
                        additionalPrice: GenericFunctions.formatMoney(a.additionalPrice),
                        pricePerLicense: GenericFunctions.formatMoney(a.pricePerLicense),
                        effectiveDate: new Date(a.effectiveDate),
                        nextBillingDate: new Date(a.nextBillingDate)
                    };
                });
            },
            onEditing(event: any) {
                this.$router.push(`/customers/register/apps/register/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
            },
            handleDelete(id: number) {
                const app = useFormDataStore().arrayData.find(d => d.id === id) as Application;
                if (app?.status !== "Ativo") {
                    this.modalInfo = ModalService.getAppsModal('warning');
                    this.toDelete = id;
                }
                else {
                    this.modalInfo = ModalService.getAppsModal('activeError');
                }
                this.toggleModal();
            },
            handleOk() {
                const formDataStore = useFormDataStore();
                if (this.modalInfo.title === 'Alerta') {
                    this.toggleModal();
                    formDataStore.deleteArrayId(this.toDelete);
                    this.applications = this.getApplications(formDataStore.arrayData)
                    this.modalInfo = ModalService.getAppsModal('success');
                    this.toggleModal();
                } else {
                    this.toggleModal();
                }
            },
            getUserPermissions() {
                return UserService.getUserPermissions()
            },
        },
        beforeRouteLeave(to, from, next) {
            useFormDataService().resetFormDataOnRouteChange(to, from);
            next();
        }
    });

</script>
<template>

    <div class="flex justify-end mt-5">
        <ButtonDefault v-if="getUserPermissions().includeApplication" label="Cadastrar Aplicação"
            class="flex bg-primary text-white rounded-lg" route="/customers/register/apps/register">
            <div class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </ButtonDefault>
    </div>

    <DataTableMain>
        <DataTable v-model:filters="filters" :value="applications" stripedRows paginator @row-edit-init="onEditing"
            :rowsPerPageOptions="[5, 10, 20, 50]"
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
                        @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
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
                        :options="statusOptions.map(o => o.value)" placeholder="Selecionar" class="p-column-filter"
                        :showClear="true">
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
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Filtrar por plano" />
                </template>
            </Column>

            <Column v-if="getUserPermissions().confidentialInformation" field="planPrice" header="Valor do Plano" style="width: 15%; min-width:10rem">
                <template #body="{ data }">
                    {{ data.planPrice }}
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Valor" />
                </template>
            </Column>

            <Column v-if="getUserPermissions().confidentialInformation" field="additionalPrice" header="Valor Adicional" style="width: 15%; min-width:10rem">
                <template #body="{ data }">
                    {{ data.additionalPrice }}
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Valor" />
                </template>
            </Column>

            <Column field="contractedLicenses" header="Licenças" style="width: 15%; min-width:10rem">
                <template #body="{ data }">
                    {{ data.contractedLicenses }}
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Valor" />
                </template>
            </Column>

            <Column v-if="getUserPermissions().confidentialInformation" field="pricePerLicense" header="Preço por Licença" style="width: 15%; min-width:10rem">
                <template #body="{ data }">
                    {{ data.pricePerLicense }}
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Valor" />
                </template>
            </Column>

            <Column v-if="getUserPermissions().confidentialInformation" field="totalPrice" header="Valor da Cobrança" style="width: 15%; min-width:10rem">
                <template #body="{ data }">
                    {{ data.totalPrice }}
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
                        placeholder="Valor" />
                </template>
            </Column>

            <Column field="nextBillingDate" header="Data próxima cobrança" filterField="nextBillingDate" dataType="date"
                style="width: 15%; min-width:13rem">
                <template #body="{ data }">
                    {{ GenericFunctions.formatDate(data.nextBillingDate) }}
                </template>

                <template #filter="{ filterModel, filterCallback }">
                    <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false"
                        @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
                </template>
            </Column>

            <Column v-if="getUserPermissions().editpplication" header="Editar" :rowEditor="true" style="width: 1%;"></Column>

            <Column v-if="getUserPermissions().deleteApplication" header="Excluir" style="width: 5%; min-width: 8rem; text-align: left">
                <template #body="{ data }">
                    <button v-on:click="handleDelete(data.id)">
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
        @ok-click="handleOk" @no-click="toggleModal" />
</template>