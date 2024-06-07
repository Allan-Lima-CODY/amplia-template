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
import CheckboxOne from '@/components/Forms/Checkboxes/CheckboxDefault.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import ButtonPresentation from '@/components/Buttons/LoginResetButton.vue'
import ScreenForms from '@/components/Forms/ScreenForms.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import VisibilityButton from '@/components/Buttons/VisibilityButton.vue';

import type { ModalInfo } from '@/models/ModalInfo';
import { ModalService } from '@/services/ModalService';

export default defineComponent({
    components: {
        ButtonDefault,
        CheckboxOne,
        LabelFields,
        LabelInformation,
        InputForms,
        ButtonPresentation,
        ScreenForms,
        ModalBase
    },

    data() {
        const usersField: UsersFields = reactive(UserService.defaultFields());
        const modalInfo: ModalInfo = reactive(ModalService.getRegisterModal());

        return {
            pageTitle: ref('Cadastro de Usuários'),

            router: useRouter(),

            inputType: ref('password'),
            eyeIconVisible: ref(true),

            emailValid: ref(true),

            modalActive: ref(false),
            modalInfo: ref({
                ...toRefs(modalInfo)
            }),

            users: ref({
                ...toRefs(usersField)
            }),

            defaultFields: ref(UserService.defaultFields()),

            selectedUser: ref(null as any),

            editing: ref(false),

            checkAll: ref(false)
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

            this.eyeIconVisible = !this.eyeIconVisible
        },

        toggleModal() {
            this.modalActive = !this.modalActive;
        },

        saveUsers() {
            this.emailValid = GenericFunctions.validateEmail(this.users.email);

            if (this.emailValid) {
                if ((this.users.name !== '' && this.users.name !== null) &&
                    (this.users.password !== '' && this.users.password !== null)) {
                    this.modalInfo = ModalService.getRegisterModal('success');
                    this.toggleModal();
                } else {
                    this.modalInfo = ModalService.getRegisterModal('error');
                    this.toggleModal();
                }
            }
        },

        fillFields() {
            this.users = this.selectedUser
        },

        handleOkClickModal() {
            if (this.modalInfo.title == 'Sucesso!') {
                this.backToQueryUser();
            }

            this.toggleModal();
        },

        toggleAllPermissions() {
            const isChecked = this.checkAll;
            this.users.viewCustomer = isChecked;
            this.users.includeCustomer = isChecked;
            this.users.editCustomer = isChecked;
            this.users.deleteCustomer = isChecked;

            this.users.includeApplication = isChecked;
            this.users.editApplication = isChecked;
            this.users.deleteApplication = isChecked;

            this.users.viewUser = isChecked;
            this.users.includeUser = isChecked;
            this.users.editUser = isChecked;
            this.users.deleteUser = isChecked;

            this.users.viewFeature = isChecked;
            this.users.includeFeature = isChecked;
            this.users.editFeature = isChecked;
            this.users.deleteFeature = isChecked;

            this.users.viewPlan = isChecked;
            this.users.includePlan = isChecked;
            this.users.editPlan = isChecked;
            this.users.deletePlan = isChecked;

            this.users.viewLog = isChecked;
        }
    },
    watch: {
        users: {
            handler() {
                this.checkAll = this.users.viewCustomer &&
                    this.users.includeCustomer &&
                    this.users.editCustomer &&
                    this.users.deleteCustomer &&

                    this.users.includeApplication &&
                    this.users.editApplication &&
                    this.users.deleteApplication &&

                    this.users.viewUser &&
                    this.users.includeUser &&
                    this.users.editUser &&
                    this.users.deleteUser &&

                    this.users.viewFeature &&
                    this.users.includeFeature &&
                    this.users.editFeature &&
                    this.users.deleteFeature &&

                    this.users.viewPlan &&
                    this.users.includePlan &&
                    this.users.editPlan &&
                    this.users.deletePlan &&

                    this.users.viewLog
            },
            deep: true
        }
    }
})

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
            <ButtonDefault label="Voltar" class="flex bg-primary text-white rounded-lg" :handle-click="backToQueryUser">
                <div class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </div>
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

                        <div>
                            <LabelFields label="Senha" for-html="password"></LabelFields>
                            <div class="relative">
                                <InputForms id="password" :type="inputType" placeholder="Digite uma senha"
                                    :readonly="editing" v-model="users.password">
                                    <VisibilityButton :eyeIconVisible="eyeIconVisible" @toggle-visibility="togglePasswordVisibility" />
                                </InputForms>
                            </div>

                            <div v-if="!editing" class="ml-2 mt-2">
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
                    <CheckboxOne :readonly="false" v-model="checkAll" id="select-all" label="Selecionar Todas"
                        class="mt-4 ml-4" @change="toggleAllPermissions" />
                    <div class="gap-5 p-6 grid grid-cols-5 ">
                        <label />
                        <LabelFields label="Visualização" for-html="view" />
                        <LabelFields label="Inclusão" for-html="include" />
                        <LabelFields label="Edição" for-html="edit" />
                        <LabelFields label="Exclusão" for-html="delete" />

                        <LabelFields label="Clientes" for-html="customer" />
                        <CheckboxOne :readonly="false" v-model="users.viewCustomer" id="viewCustomer" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.includeCustomer" id="includeCustomer" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editCustomer" id="editCustomer" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.deleteCustomer" id="deleteCustomer" label=""
                            class="ml-4" />

                        <LabelFields label="Aplicações" for-html="applications" />
                        <CheckboxOne :readonly="true" v-model="users.includeApplication" id="viewApplication" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.includeApplication" id="includeApplication"
                            label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editApplication" id="editApplication" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.deleteApplication" id="deleteApplication" label=""
                            class="ml-4" />

                        <LabelFields label="Usuários" for-html="users"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.viewUser" id="viewUser" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.includeUser" id="includeUsers" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editUser" id="editUsers" label="" class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.deleteUser" id="deleteUsers" label=""
                            class="ml-4" />

                        <LabelFields label="Funcionalidades" for-html="Features"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.viewFeature" id="viewFeature" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.includeFeature" id="includeFeatures" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editFeature" id="editFeatures" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.deleteFeature" id="deleteFeatures" label=""
                            class="ml-4" />

                        <LabelFields label="Planos" for-html="plans"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.viewPlan" id="viewPlan" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.includePlan" id="includePlans" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.editPlan" id="editPlans" label="" class="ml-4" />
                        <CheckboxOne :readonly="false" v-model="users.deletePlan" id="deletePlans" label=""
                            class="ml-4" />

                        <LabelFields label="Logs" for-html="logs"></LabelFields>
                        <CheckboxOne :readonly="false" v-model="users.viewLog" id="viewPlan" label="" class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.viewLog" id="disableIncludePlan" label=""
                            class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.viewLog" id="disableEditPlan" label="" class="ml-4" />
                        <CheckboxOne :readonly="true" v-model="users.viewLog" id="disableDeletePlan" label=""
                            class="ml-4" />
                    </div>

                    <div class="p-6">
                        <CheckboxOne :readonly="false" v-model="users.confidentialInformation"
                            id="confidentialInformation" label="Informações Confidenciais" />
                    </div>
                </DefaultCard>
                <div class="flex justify-end">
                    <ButtonPresentation label="Salvar" />
                </div>
            </div>
        </ScreenForms>

        <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
            :border-color="modalInfo.borderColor" @ok-click="handleOkClickModal" />
    </DefaultLayout>
</template>