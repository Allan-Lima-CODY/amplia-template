<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import type { CustomersFields } from '@/models/Customer';
import type { Option } from '@/models/Option';

import { StateService } from '@/services/StatesService';

import ScreenForms from '@/components/Forms/ScreenForms.vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue';
import InputForms from '@/components/Forms/InputFields/InputForms.vue';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue';
import ButtonPresentation from '@/components/Buttons/ButtonPresentation.vue';
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import SelectGroup from '@/components/Forms/SelectGroup.vue';

import useFormDataService from '@/services/FormDataService';
import { useFormDataStore } from '@/stores/formData';
import { AddressService } from '@/services/AddressService';
import type { State } from '@/models/States';

export default defineComponent({
    components: {
        ScreenForms,
        DefaultCard,
        LabelFields,
        InputForms,
        LabelInformation,
        ButtonPresentation,
        CheckboxOne, 
        InputMask,
        InputNumber,
        SelectGroup
    },
    data() {
        return {
            formData: useFormDataStore().formData as CustomersFields,
            emailValid: ref(true),
            cnpjValid: ref(true),

            states: ref([] as Option[])
        }
    },
    methods: {
        handleSubmit() {
            useFormDataService().handleSubmit();
        },
        updateFormData() {
            useFormDataStore().updateFormData(this.formData)
        }
    },
    created() {
        if (this.formData.address === undefined) {
            this.formData.status = false;
            this.formData.address = AddressService.defaultFields();
        }

        StateService.getAllStates().then((data: State[]) => {
            this.states = data.map(({ id, name }) => ({ key: id, value: name })) as Option[]
        });
    },
    watch: {
        formData: {
            handler(newFormData) {
                useFormDataStore().updateFormData(newFormData);
            },
            deep: true,
        },
    },
    beforeRouteLeave(to, from, next) {
        useFormDataService().resetFormDataOnRouteChange(to, from);
        next();
    },
});
</script>

<template>
    <ScreenForms :handle="handleSubmit">
        <div class="grid gap-9">
            <DefaultCard cardTitle="Dados da empresa">
                <div class="flex flex-col w-full gap-5.5 p-6.5">

                    <div>
                        <LabelFields label="Nome da empresa" for-html="name" />
                        <InputForms id="name" type="text" placeholder="Digite o nome da empresa"
                            v-model="formData.name" />
                    </div>

                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="CNPJ" for-html="cnpj"></LabelFields>
                            <InputMask id="cnpj" v-model="formData.cnpj" mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <LabelInformation v-if="!cnpjValid" label="CNPJ inválido!" color="text-red" />
                        </div>

                        <div class="w-full">
                            <LabelFields label="Inscrição Estadual" for-html="stateRegistration" />
                            <InputNumber v-model="formData.stateRegistration" inputId="stateRegistration" :useGrouping="false" placeholder="Digite o número da incrição estadual" class="w-full" inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></InputNumber>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <CheckboxOne :readonly="false" v-model="formData.status" id="customerStatus" label="Ativo"
                            class="ml-4" />
                    </div>
                </div>
            </DefaultCard>
            <DefaultCard cardTitle="Contato">
                <div class="flex flex-col gap-5.5 p-6.5">

                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="Pessoa de contato" for-html="contactPersonName" />
                            <InputForms id="contactPersonName" type="text"
                                placeholder="Digite o nome da pessoa de contato" v-model="formData.contact" />
                        </div>

                        <div class="w-full">
                            <LabelFields label="Telefone" for-html="telephone" />
                            <InputMask id="phone" v-model="formData.telefone" mask="(99) 99999-9999" placeholder="(00) 00000-0000" class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>
                    </div>

                    <div>
                        <LabelFields label="E-mail" for-html="email"></LabelFields>
                        <InputForms id="email" type="text" placeholder="Digite seu email" v-model="formData.email" />
                        <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                    </div>

                    <div>
                        <LabelFields label="E-mail de cobrança" for-html="billingEmail"></LabelFields>
                        <InputForms id="billingEmail" type="text" placeholder="Digite um email para cobrança"
                            v-model="formData.bilingEmail" />
                        <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                    </div>
                </div>
            </DefaultCard>
        </div>
        <div class="grid h-fit gap-9">
            <DefaultCard cardTitle="Endereço">
                <div class="flex flex-col gap-5.5 p-6.5">

                    <div class="flex gap-5">

                        <div class="w-full">
                            <LabelFields label="CEP" for-html="cep" />
                            <InputMask id="cep" v-model="formData.address.cep" mask="99999-999" placeholder="00000-000" class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>

                        <div class="w-full">
                            <LabelFields label="Estado" for-html="plan"></LabelFields>
                            <SelectGroup :options="states" v-model="formData.address.state"
                                unselect-label="Selecione o estado" />
                        </div>

                    </div>

                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="Cidade" for-html="city"></LabelFields>
                            <InputForms id="city" type="text" placeholder="Insira o nome da cidade"
                                v-model="formData.address.city" />
                        </div>

                        <div class="w-full">
                            <LabelFields label="Bairro" for-html="district"></LabelFields>
                            <InputForms id="district" type="text" placeholder="Insira o nome do Bairro"
                                v-model="formData.address.district" />
                        </div>
                    </div>

                    <div>
                        <LabelFields label="Endereço" for-html="street"></LabelFields>
                        <InputForms id="street" type="text" placeholder="Insira o nome da rua"
                            v-model="formData.address.district" />
                    </div>


                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="Complemento" for-html="addInfo"></LabelFields>
                            <InputForms id="addInfo" type="text" placeholder="Insira o complemento"
                                v-model="formData.address.additionalInfo" />
                        </div>

                        <div class="w-full">
                            <LabelFields label="Número" for-html="number"></LabelFields>
                            <InputNumber v-model="formData.address.number" inputId="number" :useGrouping="false" placeholder="Digite o número do endereço" class="w-full" inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></InputNumber>
                        </div>
                    </div>
                </div>
            </DefaultCard>
            <div class="flex justify-end">
                <ButtonPresentation label="Salvar" />
            </div>
        </div>
    </ScreenForms>
</template>