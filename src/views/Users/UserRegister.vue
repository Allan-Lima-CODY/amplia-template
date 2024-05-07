<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';

import { GenericFunctions } from '@/services/GenericFunctions'
import type { UsersFields } from '@/models/Users'
import { UserService } from '@/services/UsersService'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import ButtonApresentation from '@/components/Buttons/ButtonApresentation.vue'
import ScreenForms from '@/layouts/ScreenForms.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faArrowLeft, faEye, faEyeSlash)

export default defineComponent({
    components: {
        ButtonDefault,
        CheckboxOne,
        LabelFields,
        LabelInformation,
        InputForms,
        ButtonApresentation,
        ScreenForms,
        ModalBase
    },

    data() {
        const usersField: UsersFields = reactive(UserService.defaultFields());

        return {
            pageTitle: ref('Cadastro de Usuários'),

            router: useRouter(),

            inputType: ref('password'),
            eyeIcon: ref('eye'),

            emailValid: ref(true),

            modalSuccessActive: ref(false),
            modalErrorActive: ref(false),
            messageModalError: ref(''),
            messageModalSuccess: ref(''),

            users: {
                ...toRefs(usersField)
            },

            defaultFields: UserService.defaultFields(),

            selectedUser: null as any,

            editing: false
        }
    },
    async mounted() {
        const userId: any = this.$route.params.id;

        if (userId && typeof userId === 'string' && userId.trim() !== '') {
            this.pageTitle = 'Atualizar Dados';

            const decryptedId = GenericFunctions.decryptIdentifier(decodeURIComponent(userId));

            const users = await UserService.getAllUsers();

            this.selectedUser = users.filter((u) => u.id === decryptedId)[0];
            if (this.selectedUser.status === 'Ativo') {
                this.selectedUser.status = true
            } else {
                this.selectedUser.status = false
            }

            this.fillFields();

            this.editing = true;
        }
    },
    methods: {
        resetFields() {
            this.users = UserService.defaultFields()
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

        saveUsers() {
            this.emailValid = GenericFunctions.validateEmail(this.users.email);

            if (this.emailValid) {
                if ((this.users.name !== '' && this.users.name !== null) &&
                    (this.users.password !== '' && this.users.password !== null)) {

                    this.messageModalSuccess = 'Cadastro realizado com sucesso.';
                    this.toggleSuccessModal();
                } else {
                    this.messageModalError = 'É necessário que os campos estejam preenchidos!';
                    this.toggleErrorModal();
                }
            }
        },

        fillFields() {
            this.users = this.selectedUser
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
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
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

        <ScreenForms :handle="saveUsers">
            <div class="flex flex-col gap-9">
                <DefaultCard cardTitle="Informações da Conta">
                    <div class="flex flex-col gap-5.5 p-6.5">

                        <div>
                            <LabelFields label="Nome" for-html="name" />
                            <InputForms id="name" type="text" placeholder="Digite seu nome" v-model="users.name" />
                        </div>

                        <div>
                            <LabelFields label="E-mail" for-html="email"></LabelFields>
                            <InputForms id="email" type="text" placeholder="Digite seu email" v-model="users.email" />
                            <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                        </div>

                        <div v-if="!editing">
                            <LabelFields label="Senha" for-html="password"></LabelFields>
                            <div class="relative">
                                <InputForms id="password" :type="inputType" placeholder="Digite uma senha"
                                    v-model="users.password">
                                    <button @click.prevent="togglePasswordVisibility"
                                        class="absolute right-3 mt-4 cursor-pointer">
                                        <font-awesome-icon :icon="eyeIcon" size="lg" style="color: #bebebe;" />
                                    </button>
                                </InputForms>
                            </div>

                            <div class="ml-2 mt-2">
                                <CheckboxOne :readonly="false" v-model="users.temporaryPassword" id="temporaryPassword"
                                    label="Redefinir senha no próximo acesso" />
                            </div>
                        </div>

                        <div class="ml-2">
                            <CheckboxOne :readonly="false" v-model="users.status" id="status" label="Ativo" />
                        </div>
                    </div>
                </DefaultCard>
            </div>

            <div class="flex flex-col gap-9">
                <DefaultCard cardTitle="Permissões de Usuário">
                    <div class="gap-5 p-6 grid grid-cols-4 ">
                        <label />
                        <LabelFields label="Inclusão" for-html="include" />
                        <LabelFields label="Edição" for-html="edit" />
                        <LabelFields label="Exclusão" for-html="delete" />

                        <LabelFields label="Clientes" for-html="clients" />
                        <CheckboxOne :readonly="false" v-model="users.includeClients" id="includeClients" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editClients" id="editClients" label="" class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.deleteClients" id="deleteClients" label=""
                            class="ml-4" />

                        <LabelFields label="Usuários" for-html="users"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.includeUsers" id="includeUsers" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editUsers" id="editUsers" label="" class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.deleteUsers" id="deleteUsers" label="" class="ml-4" />

                        <LabelFields label="Licenças" for-html="licenses"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.includeLicenses" id="includeLicenses" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editLicenses" id="editLicenses" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.deleteLicenses" id="deleteLicenses" label=""
                            class="ml-4" />

                        <LabelFields label="Funcionalidades" for-html="functionalities"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.includeFunctionalities" id="includeFunctionalities"
                            label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editFunctionalities" id="editFunctionalities" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.deleteFunctionalities" id="deleteFunctionalities"
                            label="" class="ml-4" />

                        <LabelFields label="Planos" for-html="plans"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.includePlans" id="includePlans" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editPlans" id="editPlans" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.deletePlans" id="deletePlans" label="" class="ml-4" />

                        <LabelFields label="Logs" for-html="logs"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.includeLogs" id="includeLogs" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editLogs" id="editLogs" label="" class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.deleteLogs" id="deleteLogs" label="" class="ml-4" />
                    </div>

                    <div class="p-6">
                        <CheckboxOne :readonly="false" v-model="users.confidentialInformation" id="confidentialInformation"
                            label="Informações Confidenciais" />
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