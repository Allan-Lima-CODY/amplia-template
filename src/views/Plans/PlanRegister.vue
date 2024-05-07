<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';

import { GenericFunctions } from '@/services/GenericFunctions'
import type { Option } from '@/models/Option'
import type { PlansFields } from '@/models/Plans'
import { PlansService } from '@/services/PlansService'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import ButtonPresentation from '@/components/Buttons/ButtonPresentation.vue';
import ScreenForms from '@/layouts/ScreenForms.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import SelectGroup from '@/components/Forms/SelectGroup.vue'
import InputNumber from 'primevue/inputnumber';

import type { ModalInfo } from '@/models/ModalInfo';
import { ModalService } from '@/services/ModalService';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faArrowLeft, faEye, faEyeSlash)

export default defineComponent({
    components: {
        ButtonDefault,
        CheckboxOne,
        LabelFields,
        InputForms,
        ButtonPresentation,
        ScreenForms,
        ModalBase,
        SelectGroup,
        InputNumber,
        FontAwesomeIcon
    },
    data() {
        const plansField: PlansFields = reactive(PlansService.defaultFields());
        const modalInfo: ModalInfo = reactive(ModalService.getRegisterModalInfo(''));


        return {
            pageTitle: ref('Cadastro de Planos'),

            router: useRouter(),

            inputType: ref('password'),
            eyeIcon: ref('eye'),

            emailValid: ref(true),

            modalActive: ref(false),

            modalInfo:{
                ...toRefs(modalInfo)
            },
            
            plans: {
                ...toRefs(plansField)
            },

            defaultFields: PlansService.defaultFields(),

            selectedPlan: null as any,

            editing: false,

            products: [{
                key: 1,
                value: 'WMS'
            },
            {
                key: 2,
                value: 'CRM'
            }
            ] as Option[],
        }
    },
    async mounted() {
        const planId: any = this.$route.params.id;

        if (planId && typeof planId === 'string' && planId.trim() !== '') {
            this.pageTitle = 'Atualizar Dados';

            const decryptedId = GenericFunctions.decryptIdentifier(decodeURIComponent(planId));

            const users = await PlansService.getAllPlans();

            this.selectedPlan = users.filter((u) => u.id === decryptedId)[0];
            if (this.selectedPlan.product === 'WMS') {
                this.selectedPlan.product = this.products[0].value
            } else {
                this.selectedPlan.product = this.products[1].value
            }

            this.fillFields();

            this.editing = true;
        }
    },
    methods: {
        resetFields() {
            this.plans = PlansService.defaultFields();
        },

        backToQueryUser() {
            this.resetFields();

            this.$router.go(-1);
        },

        togglePasswordVisibility() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
            this.eyeIcon = this.inputType === 'password' ? 'eye' : 'eye-slash';
        },

        toggleModal() {
            this.modalActive = !this.modalActive;
        },

        savePlans() {
            if ((this.plans.name !== '' && this.plans.name !== null) && (this.plans.product.value !== '' && this.plans.product.value !== null) && (this.plans.price !== 0)) {
                this.modalInfo = ModalService.getRegisterModalInfo('success');
                this.toggleModal();
            } else {
                this.modalInfo = ModalService.getRegisterModalInfo('error');
                this.toggleModal()
            }
        },

        fillFields() {
            this.plans = this.selectedPlan
        },

        handleOkClickModal() {
            this.backToQueryUser();
            this.toggleModal();
        }
    }
});
</script>

<template>
    <DefaultLayout>

        <TitlePageDefault :pageTitle="pageTitle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6 me-4 mt-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
            </svg>
        </TitlePageDefault>

        <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />

        <div class="flex justify-start mt-6">
            <ButtonDefault class="flex bg-primary text-white rounded-lg" :handle-click="backToQueryUser">
                <div class="mr-2">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" size="sm" style="color: #FFFFFF;" />
                </div>
                Voltar
            </ButtonDefault>
        </div>

        <ScreenForms :handle="savePlans">
            <div class="flex flex-col gap-9">
                <DefaultCard cardTitle="Informações do Plano">
                    <div class="flex flex-col gap-5.5 p-6.5">

                        <div>
                            <LabelFields label="Plano" for-html="plano" />
                            <InputForms id="name" type="text" placeholder="Digite o nome do plano" v-model="plans.name" />
                        </div>

                        <div>
                            <LabelFields label="Preço Sugerido" for-html="price"></LabelFields>
                            <InputNumber v-model="plans.price" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="2" placeholder="Digite um valor" class="w-full" inputClass="rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                        </div>

                        <div>
                            <LabelFields label="Produto" for-html="product"></LabelFields>
                            <SelectGroup :options="products" v-model="plans.product" unselect-label="Escolha um produto" />
                        </div>
                    </div>
                </DefaultCard>
            </div>

            <div class="flex flex-col gap-9">
                <DefaultCard cardTitle="Funcionalidades do Plano">
                    <div class="grid gap-5 p-6">
                        <CheckboxOne :readonly="false" v-model="plans.pickingList" id="pickingList" label="Lista de Picking"
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="plans.waveSeparation" id="waveSeparation"
                            label="Separação em Onda" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="plans.separationRoute" id="separationRoute"
                            label="Rota de Separação" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="plans.orderConference" id="orderConference"
                            label="Conferência  de Pedido" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="plans.volumeControl" id="volumeControl"
                            label="Controle de volumes" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="plans.labelPrinting" id="labelPrinting"
                            label="Impressão de Etiquetas (rastreamento interno)" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="plans.labelReprint" id="labelReprint"
                            label="Reimpressão de Etiqueta" class="ml-4" />
                    </div>
                </DefaultCard>
                <div class="flex justify-end">
                    <ButtonPresentation label="Salvar" />
                </div>
            </div>
        </ScreenForms>

        <ModalBase :type="modalInfo.title" :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
            :border-color="modalInfo.borderColor" @ok-click="handleOkClickModal" />
    </DefaultLayout>
</template>