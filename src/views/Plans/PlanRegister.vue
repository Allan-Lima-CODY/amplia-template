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
import ButtonApresentation from '@/components/Buttons/ButtonApresentation.vue'
import ScreenForms from '@/layouts/ScreenForms.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import SelectGroup from '@/components/Forms/SelectGroup.vue'
import InputNumber from 'primevue/inputnumber';

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
        ButtonApresentation,
        ScreenForms,
        ModalBase,
        SelectGroup,
        InputNumber,
        FontAwesomeIcon
    },
    data() {
        const plansField: PlansFields = reactive(PlansService.defaultFields());
        
        return {
            pageTitle: ref('Cadastro de Planos'),

            router: useRouter(),

            inputType: ref('password'),
            eyeIcon: ref('eye'),

            emailValid: ref(true),

            modalSuccessActive: ref(false),
            modalErrorActive: ref(false),
            messageModalError: ref(''),
            messageModalSuccess: ref(''),

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

        toggleSuccessModal() {
            this.modalSuccessActive = !this.modalSuccessActive;
        },

        toggleErrorModal() {
            this.modalErrorActive = !this.modalErrorActive;
        },

        savePlans() {
            if ((this.plans.name !== '' && this.plans.name !== null) && (this.plans.product.value !== '' && this.plans.product.value !== null) && (this.plans.price !== 0)) {
                this.messageModalSuccess = 'Cadastro realizado com sucesso.';
                this.toggleSuccessModal();
            } else {
                this.messageModalError = 'É necessário que os campos estejam preenchidos!';
                this.toggleErrorModal()
            }
        },

        fillFields() {
            this.plans = this.selectedPlan
        },

        handleOkClickModal() {
            this.backToQueryUser();
            this.toggleSuccessModal();
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
                    <ButtonApresentation label="Salvar" />
                </div>
            </div>
        </ScreenForms>

        <ModalBase :message="messageModalSuccess" :modal-active="modalSuccessActive" title="Sucesso"
            border-color="#34D399" background-color="#DDEFEB" @ok-click="handleOkClickModal">
            <template v-slot:slot1>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                        fill="white" stroke="white"></path>
                </svg>
            </template>
        </ModalBase>

        <ModalBase :message="messageModalError" :modal-active="modalErrorActive" title="Erro" border-color="#F87171"
            background-color="#F2E1E5" @ok-click="toggleErrorModal">
            <template v-slot:slot1>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                        fill="#ffffff" stroke="#ffffff"></path>
                </svg>
            </template>
        </ModalBase>
    </DefaultLayout>
</template>