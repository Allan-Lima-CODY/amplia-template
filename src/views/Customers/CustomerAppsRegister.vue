<script setup lang="ts">
</script>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import type { Application, ApplicationFields } from '@/models/Application';
import type { Option } from '@/models/Option';

import useFormDataService from '@/services/FormDataService';
import { useFormDataStore } from '@/stores/formData';

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import InputForms from '@/components/Forms/InputFields/InputForms.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue';
import ScreenForms from '@/components/Forms/ScreenForms.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ButtonPresentation from '@/components/Buttons/ButtonPresentation.vue';
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue';
import Calendar from 'primevue/calendar';
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue';
import SelectGroup from '@/components/Forms/SelectGroup.vue';
import InputPrice from '@/components/Forms/InputFields/InputPrice.vue';
import type { Plans } from '@/models/Plans';
import { PlansService } from '@/services/PlansService';
import { ApplicationService } from '@/services/ApplicationService';

export default defineComponent({
    components:{
        TitlePageDefault,
        DefaultLayout,
        ButtonDefault,
        ScreenForms,
        SelectGroup,
        DefaultCard,
        InputForms,
        LabelFields,
        ButtonPresentation,
        CheckboxOne,
        InputPrice,
        Calendar
    },
    data(){
        return{
            applications: useFormDataStore().arrayData as Application[],
            application: {} as ApplicationFields,
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
        handleAdd(){
            this.applications.push(ApplicationService.fieldsToObj(this.application));
        },
    },
    watch: {
        formData: {
            handler(newFormData) {
                useFormDataStore().updateFormData(newFormData);
            },
            deep: true,
        },
    },
    mounted(){
        PlansService.getAllPlans().then((data: Plans[]) => {
            this.plans = data.map(({id, name}) => ({ key:id, value:name })) as Option[]
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
        <ButtonDefault label="Voltar" class="flex mt-5 bg-primary text-white rounded-lg" route="/customers/register/apps"/>
        <ScreenForms :handle="handleAdd">
            <div class="grid gap-9">
                <DefaultCard cardTitle="Dados da aplicação">
                    <div class="flex flex-col w-full gap-5.5 p-6.5">
                        <div>
                            <LabelFields label="Produto" for-html="product" />
                            <SelectGroup :options="products" v-model="application.product"  unselect-label="Selecione o produto" />
                        </div>

                        <div>
                            <LabelFields label="Plano" for-html="plan"></LabelFields>
                            <SelectGroup :options="plans" v-model="application.plan" unselect-label="Selecione o plano"  />
                        </div>

                        <div>
                            <LabelFields label="Valor do plano" for-html="planPrice" />
                            <InputPrice id="planPrice" type="text" placeholder="Insira o valor do plano" v-model="application.planPrice" />
                        </div>
                        <div>
                            <LabelFields label="Valor adicional" for-html="additionalPrice" />
                            <InputPrice id="additionalPrice" type="text" placeholder="Insira o valor adicional" v-model="application.additionalPrice" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <LabelFields label="Status da  aplicação" for-html="appStatus"></LabelFields>
                            <CheckboxOne :readonly="false" v-model="application.status" id="appStatus" label="" class="ml-4" />
                        </div>
                    </div>
                </DefaultCard>
            </div>
            <div class="grid h-fit gap-9">
                <DefaultCard cardTitle="Dados Contratuais">
                    <div class="flex flex-row gap-5.5 p-6.5">
                        <div class=" grid gap-5">
                            <div>
                                <LabelFields label="Licenças contratadas" for-html="usedLicenses" />
                                <InputForms id="usedLicenses" type="text" placeholder="Digite o nome da pessoa de contato" v-model="application.contractedLicenses" />
                            </div>
                            
                            <div>
                                <LabelFields label="Data de vigência" for-html="effectiveDate"></LabelFields>
                                <Calendar id="effectiveDate" type="text" placeholder="dd/mm/yyyy" dateFormat="dd/mm/yy" v-model="application.effectiveDate" input-class="p-3.5 bg-white border-stroke dark:bg-[#1D2A39] border-[1.5px] dark:border-[#3D4D60]" />
                            </div>
                        </div>
                        <div class="grid gap-5">
                            <div>
                                <LabelFields label="Valor por licença" for-html="perLicensePrice" />
                                <InputForms id="perLicensePrice" type="text" placeholder="Digite número de telefone" v-model="application.pricePerLicense" />
                            </div>
                            
                            <div>
                                <LabelFields label="Data da próxima cobrança" for-html="nextBillingDate"></LabelFields>
                                <Calendar id="nextBillingDate" type="text" placeholder="dd/mm/yyyy" v-model="application.nextBillingDate" dateFormat="dd/mm/yy" input-class="p-3.5 bg-white border-stroke dark:bg-[#1D2A39] border-[1.5px] dark:border-[#3D4D60]" />
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