<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import type { Customer, CustomersFields } from '@/models/Customer';
import type { Option } from '@/models/Option';
import type { ModalInfo } from '@/models/ModalInfo';
import type { State } from '@/models/States';

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
import ModalBase from '@/components/Alerts/ModalBase.vue';

import useFormDataService from '@/services/FormDataService';
import { GenericFunctions } from '@/services/GenericFunctions';
import { useFormDataStore } from '@/stores/formData';
import { StateService } from '@/services/StatesService';
import { AddressService } from '@/services/AddressService';
import { CustomersService } from '@/services/CustomersService';
import { ModalService } from '@/services/ModalService';

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
        ModalBase,
        SelectGroup
    },
    data() {
        const modalInfo : ModalInfo = reactive(ModalService.getRegisterModal());
        return {
            formData: useFormDataStore().formData as CustomersFields,
            emailValid: ref(true),
            cnpjValid: ref(true),

            editing: false,

            modalActive: ref(false),
            modalInfo: {
                ...toRefs(modalInfo)
            },

            states: ref([] as Option[])
        }
    },
    methods: {
        handleSubmit() {
            try{
                const customerId: any = this.$route.params.id;
                this.v$.$touch()
                if (!this.v$.$invalid){
                    useFormDataService().handleSubmit();
                    if (customerId && typeof customerId === 'string' && customerId.trim() !== '')
                        this.modalInfo = ModalService.getRegisterModal('updated');
                    else
                        this.modalInfo = ModalService.getRegisterModal('success');
                    this.toggleModal();
                }
                else{
                    this.modalInfo = ModalService.getRegisterModal('error');
                    this.toggleModal();
                }
            }
            catch{
                console.error("Ocorreu um erro ao salvar os dados!")
            }
        },
        updateFormData() {
            useFormDataStore().updateFormData(this.formData)
        },
        toggleModal() {
            this.modalActive = !this.modalActive;
        },
        handleOkClickModal(){
            this.toggleModal()
            if(this.modalInfo.title === 'Sucesso!')
            this.$router.push("/customers");
        }
    },
    setup() {
        const v$ = useVuelidate()
        return { v$ }
    },
    validations(){
        return {
            formData: {
                name: { required },
                email: { required, email },
                cnpj: { required },
                stateRegistration: { required },
                contact: { required },
                telefone: { required },
                bilingEmail: { required, email },
                address: {
                    cep: { required },
                    state: { required },
                    city: { required },
                    district: { required },
                    address: { required },
                    additionalInfo: { required },
                    number: { required }
                }
            }
        }
    },
    created() {
        if (this.formData.address === undefined) {
            this.formData.status = true;
            this.formData.address = AddressService.defaultFields();
        }

        StateService.getAllStates().then((data: State[]) => {
            this.states = data.map(({ id, name }) => ({ key: id, value: name })) as Option[]
        });
    },
    async mounted(){
        const customerId: any = this.$route.params.id;
        if (customerId && typeof customerId === 'string' && customerId.trim() !== '') {
            this.editing = true;
            const decryptedId = GenericFunctions.decryptIdentifier(decodeURIComponent(customerId));
            try
            {
                if(this.formData.address.number === null){
                    const customer = (await CustomersService.getAllCustomers()).find(c => c.id === decryptedId);
                    this.formData = CustomersService.toFields(customer as Customer);
                }
            }
            catch{
                console.error("Ocorreu um erro ao buscar o cliente")
            }
        }
        else{
            useFormDataStore().resetFormData()
        }
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
                            v-model="formData.name" @blur="v$.formData.name.$touch()" :readonly="editing"/>
                        <LabelInformation v-if="v$.formData.name.$error" label="Campo obrigatório!" color="text-red" />
                    </div>
                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="CNPJ" for-html="cnpj"></LabelFields>
                            <InputMask id="cnpj" v-model="formData.cnpj" mask="99.999.999/9999-99" placeholder="00.000.000/0000-00"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <LabelInformation v-if="v$.formData.cnpj.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div class="w-full">
                            <LabelFields label="Inscrição Estadual" for-html="stateRegistration" />
                            <InputNumber v-model="formData.stateRegistration" inputId="stateRegistration" :useGrouping="false"
                                placeholder="Digite o número da incrição estadual" class="w-full" inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" @blur="v$.formData.stateRegistration.$touch()" />
                            <LabelInformation v-if="v$.formData.stateRegistration.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <CheckboxOne :readonly="false" v-model="formData.status" id="customerStatus" label="Ativo" class="ml-4" />
                    </div>
                </div>
            </DefaultCard>
            <DefaultCard cardTitle="Contato">
                <div class="flex flex-col gap-5.5 p-6.5">
                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="Pessoa de contato" for-html="contactPersonName" />
                            <InputForms id="contactPersonName" type="text" placeholder="Digite o nome da pessoa de contato"
                                v-model="formData.contact" @blur="v$.formData.contact.$touch()" />
                            <LabelInformation v-if="v$.formData.contact.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div class="w-full">
                            <LabelFields label="Telefone" for-html="telephone" />
                            <InputMask id="phone" v-model="formData.telefone" mask="(99) 99999-9999" placeholder="(00) 00000-0000"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                                @blur="v$.formData.telefone.$touch()" />
                            <LabelInformation v-if="v$.formData.telefone.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                    </div>
                    <div>
                        <LabelFields label="E-mail" for-html="email"></LabelFields>
                        <InputForms id="email" type="text" placeholder="Digite seu email" v-model="formData.email"
                            @blur="v$.formData.email.$touch()" />
                        <LabelInformation v-if="v$.formData.email.$error" label="Email inválido ou campo obrigatório!" color="text-red" />
                    </div>
                    <div>
                        <LabelFields label="E-mail de cobrança" for-html="billingEmail"></LabelFields>
                        <InputForms id="billingEmail" type="text" placeholder="Digite um email para cobrança"
                            v-model="formData.bilingEmail" @blur="v$.formData.bilingEmail.$touch()" />
                        <LabelInformation v-if="v$.formData.bilingEmail.$error" label="Email inválido ou campo obrigatório!" color="text-red" />
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
                            <InputMask id="cep" v-model="formData.address.cep" mask="99999-999" placeholder="00000-000"
                                class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                                @blur="v$.formData.address.cep.$touch()" />
                            <LabelInformation v-if="v$.formData.address.cep.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div class="w-full">
                            <LabelFields label="Estado" for-html="plan"></LabelFields>
                            <SelectGroup :options="states" v-model="formData.address.state" unselect-label="Selecione o estado" />
                            <LabelInformation v-if="v$.formData.address.state.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                    </div>
                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="Cidade" for-html="city"></LabelFields>
                            <InputForms id="city" type="text" placeholder="Insira o nome da cidade" v-model="formData.address.city" @blur="v$.formData.address.city.$touch()" />
                            <LabelInformation v-if="v$.formData.address.city.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div class="w-full">
                            <LabelFields label="Bairro" for-html="district"></LabelFields>
                            <InputForms id="district" type="text" placeholder="Insira o nome do Bairro" v-model="formData.address.district" @blur="v$.formData.address.district.$touch()" />
                            <LabelInformation v-if="v$.formData.address.district.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                    </div>
                    <div>
                        <LabelFields label="Endereço" for-html="street"></LabelFields>
                        <InputForms id="street" type="text" placeholder="Insira o nome da rua" v-model="formData.address.address" @blur="v$.formData.address.address.$touch()" />
                        <LabelInformation v-if="v$.formData.address.address.$error" label="Campo obrigatório!" color="text-red" />
                    </div>
                    <div class="flex gap-5">
                        <div class="w-full">
                            <LabelFields label="Complemento" for-html="addInfo"></LabelFields>
                            <InputForms id="addInfo" type="text" placeholder="Insira o complemento" v-model="formData.address.additionalInfo" @blur="v$.formData.address.additionalInfo.$touch()" />
                            <LabelInformation v-if="v$.formData.address.additionalInfo.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                        <div class="w-full">
                            <LabelFields label="Número" for-html="number"></LabelFields>
                            <InputNumber v-model="formData.address.number" inputId="number" :useGrouping="false" placeholder="Digite o número do endereço"
                                class="w-full" inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" @blur="v$.formData.address.number.$touch()" />
                            <LabelInformation v-if="v$.formData.address.number.$error" label="Campo obrigatório!" color="text-red" />
                        </div>
                    </div>
                </div>
            </DefaultCard>
            <div class="flex justify-end">
                <ButtonPresentation label="Salvar" />
            </div>
        </div>
    </ScreenForms>
    <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
            :border-color="modalInfo.borderColor" @ok-click="handleOkClickModal" />
</template>