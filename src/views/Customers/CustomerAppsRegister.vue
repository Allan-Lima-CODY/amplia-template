<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import type { ApplicationFields, Application } from '@/models/Application';
import type { Option } from '@/models/Option';

import useFormDataService from '@/services/FormDataService';
import { useFormDataStore } from '@/stores/formData';

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue';
import ScreenForms from '@/components/Forms/ScreenForms.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ButtonPresentation from '@/components/Buttons/ButtonPresentation.vue';
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue';
import Calendar from 'primevue/calendar';
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue';
import SelectGroup from '@/components/Forms/SelectGroup.vue';
import InputPrice from '@/components/Forms/InputFields/InputPrice.vue';
import InputNumber from 'primevue/inputnumber';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue';
import ModalBase from '@/components/Alerts/ModalBase.vue';

import type { Plans } from '@/models/Plans';
import { PlansService } from '@/services/PlansService';
import { ApplicationService } from '@/services/ApplicationService';
import { GenericFunctions } from '@/services/GenericFunctions';
import type { ModalInfo } from '@/models/ModalInfo';
import { ModalService } from '@/services/ModalService';
import { UserService } from '@/services/UsersService';

export default defineComponent({
    components: {
        TitlePageDefault,
        DefaultLayout,
        ButtonDefault,
        ScreenForms,
        SelectGroup,
        DefaultCard,
        LabelFields,
        ButtonPresentation,
        CheckboxOne,
        InputPrice,
        Calendar,
        InputNumber,
        LabelInformation,
        ModalBase
    },
    data() {
        const applicationFields: ApplicationFields = reactive(ApplicationService.defaultFields());
        const modalInfo: ModalInfo = reactive(ModalService.getAppsModal());
        return{
            editing: false,
            modalActive: false,
            modalInfo:{
                ...toRefs(modalInfo)
            },
            application: {
                ...toRefs(applicationFields)
            },
            buttonLabel: 'Adicionar',
            plans: [] as Option[],
            allPlans: [] as Plans[],
            products: [{
                key: 1,
                value: 'WMS'
            },
            {
                key: 2,
                value: 'CRM'
            }
            ] as Option[],
            emailValid: ref(true),
            cnpjValid: ref(true),
        }
    },
    computed: {
        totalPrice(): number {
            const planPrice = this.application.planPrice || 0;
            const additionalPrice = this.application.additionalPrice || 0;
            const pricePerLicense = this.application.pricePerLicense || 0;
            const contractedLicenses = this.application.contractedLicenses || 0;
            return planPrice + additionalPrice + (pricePerLicense * contractedLicenses);
        }
    },
    watch: {
        totalPrice(newValue) {
            this.application.totalPrice = parseFloat(newValue.toFixed(2));
        }
    },
    methods:
    {
        async handleAdd(){
            this.v$.$touch()
            if (!this.v$.$invalid)
            {
                const formDataStore = useFormDataStore();
                
                const application = await ApplicationService.toApp(this.application);
                
                const customerId: any = this.$route.params.id;
                if (customerId && typeof customerId === 'string' && customerId.trim() !== '')
                {
                    formDataStore.patchArray(application);
                    this.modalInfo = ModalService.getAppsModal('updated')
                }
                else
                {
                    const arrayData = formDataStore.arrayData as Application[];
                    const lastId = arrayData[arrayData.length - 1]?.id;
                    application.id = lastId === undefined ? 1 : lastId as number + 1;
                    formDataStore.addToArrayData(application);
                    this.modalInfo = ModalService.getAppsModal('registered')
                }
                this.toggleModal();
            }
            else{
                this.modalInfo = ModalService.getAppsModal('fieldsError'),
                this.toggleModal();
            }
        },
        toggleModal(){
            this.modalActive = !this.modalActive;
        },
        goBack(){
            this.$router.go(-1);
        },
        handleOk(){
            this.toggleModal();
            if(this.modalInfo.title === "Sucesso!")
                this.goBack();
        },
        updateOptions(product?: string){
            let prd = product;
            if(product === null || product === undefined)
                prd = this.application.product;
            this.plans = this.allPlans.filter(p => p.product === prd).map(({ id, name }) => ({ key: id, value: name })) as Option[]
        },
        getUserPermissions() {
            return UserService.getUserPermissions()
        },
    },
    setup() {
        const v$ = useVuelidate()
        return { v$ }
    },
    validations(){
        return {
            application: {
                plan: { required },
                product: { required },
                planPrice: { required },
                additionalPrice: { required },
                contractedLicenses: { required },
                pricePerLicense: { required },
                effectiveDate: { required },
                nextBillingDate: { required },
            }
        }
    },
    async mounted(){
        PlansService.getAllPlans().then((data: Plans[]) => {
                    this.allPlans = data
                });
        
        const customerId: any = this.$route.params.id;
        const formDataStore = useFormDataStore();
        
        if (customerId && typeof customerId === 'string' && customerId.trim() !== '') {
            this.editing = true;
            this.buttonLabel = 'Salvar';
            const decryptedId = GenericFunctions.decryptIdentifier(decodeURIComponent(customerId));
            try
            {
                const application = formDataStore.arrayData.find(c => c.id === decryptedId) as Application;
                PlansService.getAllPlans().then((data: Plans[]) => {
                    this.allPlans = data
                    this.updateOptions(application?.plan.product);
                });
                this.application = await ApplicationService.toFields(application as Application);
            }
            catch{
                console.error("Ocorreu um erro ao buscar o cliente")
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        useFormDataService().resetFormDataOnRouteChange(to, from);
        next();
    }
});
</script>

<template>
    <DefaultLayout>
        <TitlePageDefault pageTitle="Cadastro de Aplicação" />
        <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />
        <ButtonDefault label="Voltar" :handle-click="goBack" class="flex mt-5 bg-primary text-white rounded-lg">
            <div class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </div>
        </ButtonDefault>
        <ScreenForms :handle="handleAdd">
            <div class="grid gap-9">
                <DefaultCard cardTitle="Dados da aplicação">
                    <div class="flex flex-col w-full gap-5.5 p-6.5">
                        <div>
                            <LabelFields label="Produto" for-html="product" />
                            <SelectGroup :readonly="editing" :options="products" v-model="application.product" @change="updateOptions()"
                                unselect-label="Selecione o produto" @blur="v$.application.product.$touch()" />
                            <LabelInformation v-if="v$.application.product.$error" label="Campo obrigatório!" color="text-red" />
                        </div>

                        <div>
                            <LabelFields label="Plano" for-html="plan"></LabelFields>
                            <SelectGroup :options="plans" v-model="application.plan"
                                @blur="v$.application.product.$touch()" unselect-label="Selecione o plano" />
                            <LabelInformation v-if="v$.application.plan.$error" label="Campo obrigatório!" color="text-red" />
                        </div>

                        <div v-if="getUserPermissions().confidentialInformation">
                            <LabelFields label="Valor do plano" for-html="planPrice" />
                            <InputPrice id="planPrice" type="text" placeholder="Insira o valor do plano"
                                v-model="application.planPrice" @blur="v$.application.planPrice.$touch()" />
                            <LabelInformation v-if="v$.application.planPrice.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div v-if="getUserPermissions().confidentialInformation">
                            <LabelFields label="Valor adicional" for-html="additionalPrice" />
                            <InputPrice id="additionalPrice" type="text" placeholder="Insira o valor adicional"
                                v-model="application.additionalPrice" @blur="v$.application.additionalPrice.$touch()" />
                            <LabelInformation v-if="v$.application.additionalPrice.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div v-if="getUserPermissions().confidentialInformation">
                            <LabelFields label="Valor de Cobrança" for-html="totalPrice" />
                            <InputPrice :readonly="true" id="totalPrice" placeholder="Confira o valor a ser cobrado"
                                v-model="application.totalPrice" />
                        </div>
                        <div class="flex gap-1">
                            <CheckboxOne :readonly="false" v-model="application.status" id="appStatus" label="Ativo"
                                class="ml-4" />
                        </div>
                    </div>
                </DefaultCard>
            </div>
            <div class="grid h-fit gap-9">
                <DefaultCard cardTitle="Dados Contratuais">
                    <div class="flex flex-col gap-5.5 p-6.5">
                        <div class="flex gap-5">
                            <div class="w-full">
                                <LabelFields label="Licenças contratadas" for-html="contractedLicenses" />
                                <InputNumber v-model="application.contractedLicenses" placeholder="Digite a quantidade de licenças" class="w-full"
                                    @blur="v$.application.contractedLicenses.$touch()" inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                <LabelInformation v-if="v$.application.contractedLicenses.$error" label="Campo obrigatório!" color="text-red" />
                            </div>

                            <div v-if="getUserPermissions().confidentialInformation" class="w-full">
                                <LabelFields label="Valor por licença" for-html="perLicensePrice" />
                                <InputPrice id="perLicensePrice" type="text" placeholder="Digite o valor por licença"
                                @blur="v$.application.pricePerLicense.$touch()" v-model="application.pricePerLicense" />
                                <LabelInformation v-if="v$.application.pricePerLicense.$error" label="Campo obrigatório!" color="text-red" />
                            </div>
                        </div>

                        <div class="flex gap-5">
                            <div class="w-full">
                                <LabelFields label="Data de vigência" for-html="effectiveDate"></LabelFields>
                                <Calendar :readonly="editing" id="effectiveDate" type="text" placeholder="dd/mm/yyyy" dateFormat="dd/mm/yy" :manual-input="false"
                                    v-model="application.effectiveDate" class="w-full"
                                    @blur="v$.application.effectiveDate.$touch()" :input-class="`rounded-lg border-[1.5px] border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                                    ${editing ? 'text-slate-400' : 'text-black dark:text-white'}` " />
                                <LabelInformation v-if="v$.application.effectiveDate.$error" label="Campo obrigatório!" color="text-red" />
                            </div>

                            <div class="w-full">
                                <LabelFields label="Data da próxima cobrança" for-html="nextBillingDate"></LabelFields>
                                <Calendar :readonly="editing" id="nextBillingDate" type="text" placeholder="dd/mm/yyyy"
                                    @blur="v$.application.nextBillingDate.$touch()" v-model="application.nextBillingDate" dateFormat="dd/mm/yy" class="w-full"
                                    :input-class="`rounded-lg border-[1.5px] border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                                    ${editing ? 'text-slate-400' : 'text-black dark:text-white'}` " />
                                <LabelInformation v-if="v$.application.nextBillingDate.$error" label="Campo obrigatório!" color="text-red" />
                            </div>
                        </div>
                    </div>
                </DefaultCard>
                <div class="flex justify-end">
                    <ButtonPresentation :label="buttonLabel" />
                </div>
            </div>
        </ScreenForms>
    </DefaultLayout>
    <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
            :border-color="modalInfo.borderColor" @ok-click="handleOk" />
</template>