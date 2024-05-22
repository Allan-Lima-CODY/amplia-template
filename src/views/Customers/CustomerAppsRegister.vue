<script setup lang="ts">
</script>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

import type { ApplicationFields } from '@/models/Application';
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

import type { Plans } from '@/models/Plans';
import { PlansService } from '@/services/PlansService';
import { ApplicationService } from '@/services/ApplicationService';

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
        InputNumber
    },
    data() {
        const applicationFields: ApplicationFields = reactive(ApplicationService.defaultFields());
        return{
            application: {
                ...toRefs(applicationFields)
            },
            plans: [] as Option[],
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
    methods:
    {
        async handleAdd(){
            const formDataStore = useFormDataStore();

            const arrayData = formDataStore.arrayData;
            const lastId = arrayData[arrayData.length - 1]?.id;
            this.application.id = lastId === undefined ? 1 : lastId as number + 1;

            formDataStore.addToArrayData(await ApplicationService.toApp(this.application));
            
            this.$router.go(-1);
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    created() {
        PlansService.getAllPlans().then((data: Plans[]) => {
            this.plans = data.map(({ id, name }) => ({ key: id, value: name })) as Option[]
        });
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
        <ButtonDefault label="Voltar" :handle-click="goBack" class="flex mt-5 bg-primary text-white rounded-lg"
            >
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
                            <SelectGroup :options="products" v-model="application.product"
                                unselect-label="Selecione o produto" />
                        </div>

                        <div>
                            <LabelFields label="Plano" for-html="plan"></LabelFields>
                            <SelectGroup :options="plans" v-model="application.plan"
                                unselect-label="Selecione o plano" />
                        </div>

                        <div>
                            <LabelFields label="Valor do plano" for-html="planPrice" />
                            <InputPrice id="planPrice" type="text" placeholder="Insira o valor do plano"
                                v-model="application.planPrice" />
                        </div>
                        <div>
                            <LabelFields label="Valor adicional" for-html="additionalPrice" />
                            <InputPrice id="additionalPrice" type="text" placeholder="Insira o valor adicional"
                                v-model="application.additionalPrice" />
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
                                <LabelFields label="Licenças contratadas" for-html="usedLicenses" />
                                <InputNumber v-model="application.contractedLicenses" placeholder="Digite a quantidade de licenças" class="w-full"
                                    inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            </div>

                            <div class="w-full">
                                <LabelFields label="Valor por licença" for-html="perLicensePrice" />
                                <InputPrice id="perLicensePrice" type="text" placeholder="Digite o valor por licença"
                                    v-model="application.pricePerLicense" />
                            </div>
                        </div>

                        <div class="flex gap-5">
                            <div class="w-full">
                                <LabelFields label="Data de vigência" for-html="effectiveDate"></LabelFields>
                                <Calendar id="effectiveDate" type="text" placeholder="dd/mm/yyyy" dateFormat="dd/mm/yy"
                                    v-model="application.effectiveDate" class="w-full"
                                    input-class="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            </div>

                            <div class="w-full">
                                <LabelFields label="Data da próxima cobrança" for-html="nextBillingDate"></LabelFields>
                                <Calendar id="nextBillingDate" type="text" placeholder="dd/mm/yyyy"
                                    v-model="application.nextBillingDate" dateFormat="dd/mm/yy" class="w-full"
                                    input-class="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            </div>
                        </div>

                    </div>
                </DefaultCard>
                <div class="flex justify-end">
                    <ButtonPresentation label="Adicionar" />
                </div>
            </div>
        </ScreenForms>
    </DefaultLayout>
</template>