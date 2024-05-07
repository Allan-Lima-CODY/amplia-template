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

library.add(faEye, faEyeSlash, faUser)

export default {
    components: {
        FontAwesomeIcon,
        PasswordField,
        ApresentationLayout,
        ButtonApresentation,
        LabelInformation,
        ModalBase
    },
    data() {
        return {
            password: ref(''),

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

        getPassword(newPassword: string) {
            this.password = newPassword;
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
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <div class="relative">
                    <input type="email" v-model="email"
                        class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white" />

                    <span class="absolute right-4 top-4">
                        <font-awesome-icon :icon="['fas', 'user']" size="lg" style="color: #bebebe;" />
                    </span>
                    <LabelInformation v-if="!emailValid" label="Email inválido!" color="text-red" />
                </div>
            </div>

            <PasswordField id="password" label="Senha" @passwordChanged="getPassword">
                <div class="text-left bottom-4 text-sm font-medium text-gray-900 dark:text-white mt-4 relative">
                    <a href="#" @click.prevent="forgotPassword" class="hover:text-blue-500">Esqueceu a
                        senha?</a>
                </div>
            </PasswordField>

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