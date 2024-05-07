<script lang="ts">
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

import { GenericFunctions } from '@/services/GenericFunctions'

import ApresentationLayout from '@/layouts/ApresentationLayout.vue';
import PasswordField from '@/components/Forms/InputFields/PresentationPassword.vue';
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import LabelInformation from '@/components/Forms/Labels/LabelInformation.vue'
import ModalBase from '@/components/Alerts/ModalBase.vue'
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'

library.add(faEye, faEyeSlash, faUser)

export default {
    components: {
        FontAwesomeIcon,
        PasswordField,
        ApresentationLayout,
        ButtonApresentation,
        LabelInformation,
        ModalBase,
        LabelFields,
        InputForms
    },
    data() {
        return {
            password: ref(''),

            inputType: ref('password'),
            eyeIcon: ref('eye'),

            modalSuccessActive: ref(false),
            modalErrorActive: ref(false),
            messageModalError: ref(''),
            messageModalSuccess: ref(''),

            email: ref(''),
            emailValid: ref(true),

            hardPassword: ref('123456'),
            hardEmail: ref('teste@smart01.com.br')
        };
    },
    methods: {
        toggleSuccessModal() {
            this.modalSuccessActive = !this.modalSuccessActive;
        },

        toggleErrorModal() {
            this.modalErrorActive = !this.modalErrorActive;
        },

        togglePasswordVisibility() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
            this.eyeIcon = this.inputType === 'password' ? 'eye' : 'eye-slash';
        },

        forgotPassword() {
            this.emailValid = GenericFunctions.validateEmail(this.email);

            if (this.emailValid) {
                if (this.email === this.hardEmail) {
                    this.$router.push('/passwordreset');
                } else {
                    this.messageModalError = 'E-mail não encontrado!';
                    this.toggleErrorModal();
                }
            }
        },
        login() {
            if (this.email === this.hardEmail && this.password === this.hardPassword)
                this.$router.push('/home');
            else {
                this.messageModalError = 'E-mail ou senha inválidos!';
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
    <ApresentationLayout card-title="LOGIN" :handle="login">
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
                            <font-awesome-icon :icon="eyeIcon" size="lg" style="color: #bebebe;" />
                        </button>

                        <div class="text-left bottom-4 text-sm font-medium text-gray-900 dark:text-white mt-6 relative">
                            <a href="#" @click.prevent="forgotPassword" class="hover:text-blue-500">Esqueceu a senha?</a>
                        </div>
                    </InputForms>
                </div>
            </div>

            <ButtonApresentation label="Login" />
        </template>

        <template v-slot:slot2>
            <ModalBase :message="messageModalSuccess" :modal-active="modalSuccessActive" title="Sucesso"
                border-color="#34D399" background-color="#DDEFEB" @ok-click="toggleSuccessModal"/>

            <ModalBase :message="messageModalError" :modal-active="modalErrorActive" title="Erro" border-color="#F87171"
                background-color="#F2E1E5" @ok-click="toggleErrorModal"/>
        </template>
    </ApresentationLayout>
</template>