<script lang="ts">
import { ref, toRefs, reactive } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

import { GenericFunctions } from '@/services/GenericFunctions'
import { ModalService } from '@/services/ModalService'
import { UserService } from '@/services/UsersService'

import type { ModalInfo } from '@/models/ModalInfo'

import PresentationLayout from '@/layouts/PresentationLayout.vue';
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher.vue'
import type { Login } from '@/models/User'

library.add(faEye, faEyeSlash, faUser)


export default {
    components: {
        FontAwesomeIcon,
        PresentationLayout,
        ButtonApresentation,
        LabelInformation,
        ModalBase,
        LabelFields,
        InputForms,
        DarkModeSwitcher
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
                this.$router.push('/login');
            } else {
                // Token is valid, refresh the expiry time
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
                const users = await UserService.getAllUsers();
                const user = users.find(user => user.email === this.loginData.email);
                if (user) {
                    this.$router.push('/passwordreset');
                } else {
                    this.modalInfo = ModalService.getLoginModal('EmailNotFound');
                    this.toggleModal();
                }
            }
        },

        async login() {
            const users = await UserService.getAllUsers();
            const user = users.find(user => user.email === this.loginData.email && user.password === this.loginData.password);
            if (user) {
                const token = GenericFunctions.generateToken();
                const expiryTime = new Date().getTime() + (30 * 60 * 1000)

                localStorage.setItem('loggedInUser', JSON.stringify({ id: user.id, email: user.email, token, expiryTime }));
                this.$router.push('/home');
            } else {
                this.modalInfo = ModalService.getLoginModal('loginError');
                this.toggleModal();
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
            <div>
                <div class="relative">
                    <LabelFields label="E-mail" for-html="email"></LabelFields>
                    <InputForms id="email" type="text" placeholder="Digite seu email" v-model="loginData.email" @keyup.enter="login" />
                    <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                </div>
            </div>

            <div>
                <div class="relative">
                    <LabelFields label="Senha" for-html="password"></LabelFields>
                    <InputForms id="password" :type="inputType" placeholder="Digite sua senha" v-model="loginData.password" @keyup.enter="login">
                        <button @click.prevent="togglePasswordVisibility" class="absolute right-3 mt-4 cursor-pointer">
                            <svg v-if="eyeIconVisible" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <svg v-if="!eyeIconVisible" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </button>

                        <div class="text-left bottom-4 text-sm font-medium text-gray-900 dark:text-white mt-6 relative">
                            <a href="#" @click.prevent="forgotPassword" class="hover:text-blue-500">Esqueceu a
                                senha?</a>
                        </div>
                    </InputForms>
                </div>
            </div>

            <ButtonApresentation label="Login" />
        </template>

        <template v-slot:slot2>
            <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
                :border-color="modalInfo.borderColor" @ok-click="toggleModal" />
        </template>
    </PresentationLayout>
</template>