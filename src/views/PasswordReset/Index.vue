<script lang="ts">
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

import AlertSuccess from '@/components/Alerts/AlertSuccess.vue';
import AlertError from '@/components/Alerts/AlertError.vue';
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import ApresentationLayout from '@/layouts/ApresentationLayout.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'

library.add(faEye, faEyeSlash, faUser)

export default {
    components: {
        FontAwesomeIcon,
        AlertSuccess,
        AlertError,
        ButtonApresentation,
        ApresentationLayout,
        LabelFields,
        InputForms
    },
    data() {
        return {
            password: ref(''),
            confirmPassword: ref(''),

            inputPassword: ref('password'),
            inputConfirmPassword: ref('password'),

            eyeIconPassword: ref('eye'),
            eyeIconConfirmPassword: ref('eye'),

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

        passwordReset() {
            if (this.password !== '' && this.confirmPassword !== '') {
                if (this.password === this.confirmPassword) {
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

            <div>
                <div class="relative">
                    <LabelFields label="Senha" for-html="password"></LabelFields>
                    <InputForms id="password" :type="inputPassword" placeholder="Digite sua senha" v-model="password">
                        <button @click.prevent="togglePasswordVisibility" class="absolute right-3 mt-4 cursor-pointer">
                            <font-awesome-icon :icon="eyeIconPassword" size="lg" style="color: #bebebe;" />
                        </button>
                    </InputForms>
                </div>
            </div>

            <div>
                <div class="relative">
                    <LabelFields label="Confirmar Senha" for-html="password"></LabelFields>
                    <InputForms id="password" :type="inputConfirmPassword" placeholder="Confirme sua senha" v-model="confirmPassword">
                        <button @click.prevent="togglePasswordVisibility" class="absolute right-3 mt-4 cursor-pointer">
                            <font-awesome-icon :icon="eyeIconConfirmPassword" size="lg" style="color: #bebebe;" />
                        </button>
                    </InputForms>
                </div>
            </div>

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