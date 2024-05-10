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
        const modalInfo: ModalInfo = reactive(ModalService.getLoginModalInfo());
        return {
            password: ref(''),

            inputType: ref('password'),
            eyeIcon: ref('eye'),

            modalInfo: {
                ...toRefs(modalInfo)
            },
            modalActive:(false),

            email: ref(''),
            emailValid: ref(true),

            hardPassword: ref('123456'),
            hardEmail: ref('teste@smart01.com.br')
        };
    },
    methods: {

        toggleModal(modalType?: string) {
            if(modalType !== undefined)
                this.modalInfo = ModalService.getLoginModalInfo(modalType);
            this.modalActive = !this.modalActive;
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
                    this.modalInfo = ModalService.getLoginModalInfo('EmailNotFound');
                    this.toggleModal();
                }
            }
        },
        login() {
            if (this.email === this.hardEmail && this.password === this.hardPassword)
                this.$router.push('/home');
            else {
                this.modalInfo = ModalService.getLoginModalInfo('loginError');
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
            <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
                :border-color="modalInfo.borderColor" @ok-click="toggleModal"/>
        </template>
    </PresentationLayout>
</template>