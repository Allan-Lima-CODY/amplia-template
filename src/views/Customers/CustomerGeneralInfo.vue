<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { Customer } from '@/models/Customer';

import ScreenForms from '@/components/Forms/ScreenForms.vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue';
import InputForms from '@/components/Forms/InputFields/InputForms.vue';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue';
import ButtonPresentation from '@/components/Buttons/ButtonPresentation.vue';
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue';

export default defineComponent({
    components:{
        ScreenForms,
        DefaultCard,
        LabelFields,
        InputForms,
        LabelInformation,
        ButtonPresentation,
        CheckboxOne
    },
    methods:{
        handleRegister(){

        }
    },
    data(){
        return {
            customer: {} as Customer,
            customerStatus: ref(false),
            emailValid: ref(true),
            cnpjValid: ref(true),
        }
    }
});
</script>

<template>
    <ScreenForms :handle="handleRegister">
            <div class="grid gap-9">
                <DefaultCard cardTitle="Dados da empresa">
                    <div class="flex flex-col w-full gap-5.5 p-6.5">
                        <div>
                            <LabelFields label="Nome da empresa" for-html="name" />
                            <InputForms id="name" type="text" placeholder="Digite seu nome" v-model="customer.name" />
                        </div>

                        <div>
                            <LabelFields label="CNPJ" for-html="cnpj"></LabelFields>
                            <InputForms id="cnpj" type="text" placeholder="Insira o CNPJ" v-model="customer.email" />
                            <LabelInformation v-if="!cnpjValid" label="CNPJ inválido!" color="text-red" />
                        </div>

                        <div>
                            <LabelFields label="Inscrição Estadual" for-html="stateRegs" />
                            <InputForms id="stateRegs" type="text" placeholder="Digite o número da inscrição estadual" v-model="customer.name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <LabelFields label="Status do cliente" for-html="customerStatus"></LabelFields>
                            <CheckboxOne :readonly="false" v-model="customerStatus" id="customerStatus" label="" class="ml-4" />
                        </div>
                    </div>
                </DefaultCard>
                <DefaultCard cardTitle="Endereço">
                    <div class="flex flex-col gap-5.5 p-6.5">

                        <div>
                            <LabelFields label="CEP" for-html="cep" />
                            <InputForms id="cep" type="text" placeholder="Digite seu CEP" v-model="customer.name" />
                        </div>

                        <div>
                            <LabelFields label="UF" for-html="uf"></LabelFields>
                            <InputForms id="uf" type="text" placeholder="Insira a Unidade Federativa" v-model="customer.email" />
                        </div>

                        <div>
                            <LabelFields label="Cidade" for-html="city"></LabelFields>
                            <InputForms id="city" type="text" placeholder="Insira o nome da cidade" v-model="customer.email" />
                        </div>

                        <div>
                            <LabelFields label="Bairro" for-html="county"></LabelFields>
                            <InputForms id="county" type="text" placeholder="Insira o nome do Bairro" v-model="customer.email" />
                        </div>

                        <div>
                            <LabelFields label="Endereço" for-html="street"></LabelFields>
                            <InputForms id="street" type="text" placeholder="Insira o nome da rua" v-model="customer.email" />
                        </div>

                        <div>
                            <LabelFields label="Complemento" for-html="addInfo"></LabelFields>
                            <InputForms id="addInfo" type="text" placeholder="Insira o complemento" v-model="customer.email" />
                        </div>
                        
                        <div>
                            <LabelFields label="Número" for-html="number"></LabelFields>
                            <InputForms id="number" type="text" placeholder="Digite o número" v-model="customer.email" />
                        </div>
                    </div>
                </DefaultCard>
            </div>
            <div class="grid h-fit gap-9">
                <DefaultCard cardTitle="Contato">
                    <div class="flex flex-col gap-5.5 p-6.5">

                        <div>
                            <LabelFields label="Pessoa de contato" for-html="contactPersonName" />
                            <InputForms id="contactPersonName" type="text" placeholder="Digite o nome da pessoa de contato" v-model="customer.name" />
                        </div>

                        <div>
                            <LabelFields label="Telefone" for-html="telephone" />
                            <InputForms id="telephone" type="text" placeholder="Digite número de telefone" v-model="customer.name" />
                        </div>

                        <div>
                            <LabelFields label="E-mail" for-html="email"></LabelFields>
                            <InputForms id="email" type="text" placeholder="Digite seu email" v-model="customer.email" />
                            <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                        </div>

                        <div>
                            <LabelFields label="E-mail de cobrança" for-html="billingEmail"></LabelFields>
                            <InputForms id="billingEmail" type="text" placeholder="Digite seu email" v-model="customer.email" />
                            <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                        </div>
                    </div>
                </DefaultCard>
                <ButtonPresentation label="Salvar" />
            </div>
    </ScreenForms>
</template>