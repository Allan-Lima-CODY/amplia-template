<script lang="ts">
import { ref, toRefs, reactive } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'
import { ModalService } from '@/services/ModalService'
import { UserService } from '@/services/UsersService'

import type { ModalInfo } from '@/models/ModalInfo'

import PresentationLayout from '@/layouts/PresentationLayout.vue';
import ButtonApresentation from '@/components/Buttons/LoginResetButton.vue';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher.vue'
import type { Login } from '@/models/User'
import VisibilityButton from '@/components/Buttons/VisibilityButton.vue'



export default {
    components: {
        PresentationLayout,
        ButtonApresentation,
        LabelInformation,
        ModalBase,
        LabelFields,
        InputForms,
        DarkModeSwitcher,
        VisibilityButton
    },
    data() {
        const loginFields: Login = reactive(UserService.LoginDefaultFields());
        const modalInfo: ModalInfo = reactive(ModalService.getLoginModal());
        return {
            inputType: ref('password'),
            eyeIconVisible: ref(true),

            modalInfo: ref({
                ...toRefs(modalInfo)
            }),
            modalActive: ref((false)),

            loginData: ref({
                ...toRefs(loginFields)
            }),

            emailValid: ref(true)
        };
    },
    created() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')?.toString() || 'null');

        if (loggedInUser) {
            const currentTime = new Date().getTime();
            if (currentTime > loggedInUser.expiryTime) {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('dataUser');
                this.$router.push('/');
            } else {
                const newExpiryTime = currentTime + (30 * 60 * 1000);
                loggedInUser.expiryTime = newExpiryTime;
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            }
        }
    },
    methods: {
        toggleModal(modalType?: string) {
            if (modalType !== undefined)
                this.modalInfo = ModalService.getLoginModal(modalType);
            this.modalActive = !this.modalActive;
        },

        togglePasswordVisibility() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
            this.eyeIconVisible = !this.eyeIconVisible;
        },

        async forgotPassword() {
            this.emailValid = GenericFunctions.validateEmail(this.loginData.email);
            if (this.emailValid) {
                const user = await UserService.getAllUsers().then(users => users.find(user => user.email === this.loginData.email));
                if (user) {
                    this.$router.push('/passwordreset');
                } else {
                    this.modalInfo = ModalService.getLoginModal('EmailNotFound');
                    this.toggleModal();
                }
            }
        },

        async login() {
            const user = await UserService.getAllUsers().then(users => users.find(user => user.email === this.loginData.email && user.password === this.loginData.password));

            if (user) {
                const { password, status, email, temporaryPassword, createdAt, ...permissions } = user;
                const token = GenericFunctions.generateToken();
                const expiryTime = new Date().getTime() + (30 * 60 * 1000);

                const encryptedPermissions = GenericFunctions.encryptObject(permissions);
                localStorage.setItem('dataUser', JSON.stringify({ encryptedPermissions }));
                localStorage.setItem('loggedInUser', JSON.stringify({ token, expiryTime }));

                localStorage.setItem('loginEvent', JSON.stringify({ time: new Date().getTime() }));
                this.$router.push('/home');
            } else {
                this.toggleModal('loginError');
            }
        }
    }
};
</script>

<style>
input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>

<template>
    <DarkModeSwitcher class="hidden" />
    <PresentationLayout card-title="LOGIN" :handle="login">
        <template v-slot:slot1>
            <div class="relative">
                <LabelFields label="E-mail" for-html="email"></LabelFields>
                <InputForms id="email" type="text" placeholder="Digite seu email" v-model="loginData.email"
                    />
                <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
            </div>

            <div class="relative">
                <LabelFields label="Senha" for-html="password"></LabelFields>
                <InputForms id="password" :type="inputType" placeholder="Digite sua senha"
                    v-model="loginData.password">
                    <VisibilityButton :eyeIconVisible="eyeIconVisible" @toggle-visibility="togglePasswordVisibility" />

                    <div class="text-left bottom-4 text-sm font-medium text-gray-900 dark:text-white mt-6 relative">
                        <a href="#" @click.prevent="forgotPassword" class="hover:text-blue-500">Esqueceu a
                            senha?</a>
                    </div>
                </InputForms>
            </div>

            <ButtonApresentation label="Login" />
        </template>

        <template v-slot:slot2>
            <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
                :border-color="modalInfo.borderColor" @ok-click="toggleModal" />
        </template>
    </PresentationLayout>
</template>