<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DefaultCard from '@/components/Forms/DefaultCard.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';

import { GenericFunctions } from '@/services/GenericFunctions'
import type { UsersFields } from '@/models/User'
import { UserService } from '@/services/UsersService'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxOne.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue'
import ScreenForms from '@/layouts/ScreenForms.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'

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
        LabelInformation,
        InputForms,
        ButtonApresentation,
        ScreenForms,
        ModalBase
    },

    data() {
        const usersField: UsersFields = reactive(UserService.defaultFields());
        const modalInfo: ModalInfo = reactive(ModalService.getRegisterModalInfo());

        return {
            pageTitle: ref('Cadastro de Usuários'),

            router: useRouter(),

            inputType: ref('password'),
            eyeIcon: ref('eye'),

            emailValid: ref(true),

            modalActive: ref(false),
            modalInfo: {
                ...toRefs(modalInfo)
            },

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

        toggleModal() {
            this.modalActive = !this.modalActive;
        },

        saveUsers() {
            this.emailValid = GenericFunctions.validateEmail(this.users.email);

            if (this.emailValid) {
                if ((this.users.name !== '' && this.users.name !== null) &&
                    (this.users.password !== '' && this.users.password !== null)) {
                    this.modalInfo = ModalService.getRegisterModalInfo('success');
                    this.toggleModal();
                } else {
                    this.modalInfo = ModalService.getRegisterModalInfo('error');
                    this.toggleModal();
                }
            }
        },

        fillFields() {
            this.users = this.selectedUser
        },

        handleOkClickModal() {
            if(this.modalInfo.title == 'Sucesso!') {
                this.backToQueryUser();
            }
            
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

        <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
            :border-color="modalInfo.borderColor" @ok-click="handleOkClickModal"/>
    </DefaultLayout>
</template>