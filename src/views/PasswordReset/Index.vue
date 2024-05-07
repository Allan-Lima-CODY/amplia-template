<script lang="ts">
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

import AlertSuccess from '@/components/Alerts/AlertSuccess.vue';
import AlertError from '@/components/Alerts/AlertError.vue';
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import ApresentationLayout from '@/layouts/ApresentationLayout.vue';
import PasswordField from '@/components/Forms/InputFields/PresentationPassword.vue';

library.add(faEye, faEyeSlash, faUser)

export default {
    components: {
        FontAwesomeIcon,
        AlertSuccess,
        AlertError,
        PasswordField,
        ButtonApresentation,
        ApresentationLayout
    },
    data() {
        return {
            inputPassword: ref('password'),
            inputConfirmPassword: ref('password'),
            eyeIconPassword: ref('eye'),
            eyeIconConfirmPassword: ref('eye'),
            new_password: ref(''),
            confirm_password: ref(''),

            modalSuccessActive: ref(false),
            modalErrorActive: ref(false),
            messageModalError: ref(''),
            messageModalSuccess: ref(''),
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.inputPassword = this.inputPassword === 'password' ? 'text' : 'password';
            this.eyeIconPassword = this.inputPassword === 'password' ? 'eye' : 'eye-slash';
        },

        toggleConfirmPasswordVisibility() {
            this.inputConfirmPassword = this.inputConfirmPassword === 'password' ? 'text' : 'password';
            this.eyeIconConfirmPassword = this.inputConfirmPassword === 'password' ? 'eye' : 'eye-slash';
        },

        toggleSuccessModal() {
            this.modalSuccessActive = !this.modalSuccessActive;
        },

        toggleErrorModal() {
            this.modalErrorActive = !this.modalErrorActive;
        },

        updateNewPassword(newPassword: string) {
            this.new_password = newPassword;
        },

        updateConfirmPassword(newPassword: string) {
            this.confirm_password = newPassword;
        },

        passwordReset() {
            if (this.new_password !== '' && this.confirm_password !== '') {
                if (this.new_password === this.confirm_password) {
                    this.messageModalSuccess = 'Senha alterada com sucesso. Agora você já pode voltar para o login.';
                    this.toggleSuccessModal();
                } else {
                    this.messageModalError = 'As senhas não correspondem!';
                    this.toggleErrorModal();
                }
            } else {
                this.messageModalError = 'É necessário que os campos sejam preenchidos!';
                this.toggleErrorModal();
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
    <ApresentationLayout card-title="Altere sua senha" :handle="passwordReset" >
        <template v-slot:slot1>
            <PasswordField id="password" label="Nova Senha" @passwordChanged="updateNewPassword" />
            <PasswordField id="confirmPassword" label="Confirmar Senha" @passwordChanged="updateConfirmPassword" />

            <ButtonApresentation label="Alterar Senha" />

            <div>
                <router-link :to="{ path: '/' }">
                    <input type="button" value="Voltar ao login"
                        class="w-full cursor-pointer rounded-lg p-4 font-medium text-primary transition hover:bg-opacity-90" />
                </router-link>
            </div>
        </template>

        <template v-slot:slot2>
            <AlertSuccess :modal-active="modalSuccessActive" @close-modal="toggleSuccessModal"
                :success-message="messageModalSuccess">
                <p class="text-base leading-relaxed text-body">
                    {{ messageModalSuccess }}
                </p>
            </AlertSuccess>

            <AlertError :modal-active="modalErrorActive" @close-modal="toggleErrorModal"
                :error-message="messageModalError">
                <p class="text-base leading-relaxed text-body">
                    {{ messageModalError }}
                </p>
            </AlertError>
        </template>
    </ApresentationLayout>
</template>