<script lang="ts">
import { ref, toRefs, reactive } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

import { GenericFunctions } from '@/services/GenericFunctions'
import { ModalService } from '@/services/ModalService'

import type { ModalInfo } from '@/models/ModalInfo'

import PresentationLayout from '@/layouts/PresentationLayout.vue';
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher.vue'

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
        const modalInfo: ModalInfo = reactive(ModalService.getLoginModal());
        return {
            password: ref(''),

            inputType: ref('password'),
            eyeIconVisible: ref(true),

            modalInfo: ref({
                ...toRefs(modalInfo)
            }),
            modalActive: ref((false)),

            email: ref(''),
            emailValid: ref(true),

            hardPassword: ref('123456'),
            hardEmail: ref('teste@smart01.com.br')
        };
    },
    methods: {

        toggleModal(modalType?: string) {
            if (modalType !== undefined)
                this.modalInfo = ModalService.getLoginModal(modalType);
            this.modalActive = !this.modalActive;
        },

        togglePasswordVisibility() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';

            this.eyeIconVisible = !this.eyeIconVisible
        },

        forgotPassword() {
            this.emailValid = GenericFunctions.validateEmail(this.email);

            if (this.emailValid) {
                if (this.email === this.hardEmail) {
                    this.$router.push('/passwordreset');
                } else {
                    this.modalInfo = ModalService.getLoginModal('EmailNotFound');
                    this.toggleModal();
                }
            }
        },
        login() {
            if (this.email === this.hardEmail && this.password === this.hardPassword)
                this.$router.push('/home');
            else {
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
                    <InputForms id="email" type="text" placeholder="Digite seu email" v-model="email" />
                    <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                </div>
            </div>

            <div>
                <div class="relative">
                    <LabelFields label="Senha" for-html="password"></LabelFields>
                    <InputForms id="password" :type="inputType" placeholder="Digite sua senha" v-model="password">
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