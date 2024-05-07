<script lang="ts">
import { ref, reactive, toRefs } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

import type { ModalInfo } from '@/models/ModalInfo'

import { ModalService } from '@/services/ModalService'

import ModalBase from '@/components/Alerts/ModalBase.vue'
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import ApresentationLayout from '@/layouts/ApresentationLayout.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'

library.add(faEye, faEyeSlash, faUser)

export default {
    components: {
        FontAwesomeIcon,
        ModalBase,
        ButtonApresentation,
        ApresentationLayout,
        LabelFields,
        InputForms
    },
    data() {
        const modalInfo: ModalInfo = reactive(ModalService.getLoginModalInfo());
        return {
            password: ref(''),
            confirmPassword: ref(''),

            inputPassword: ref('password'),
            inputConfirmPassword: ref('password'),

            eyeIconPassword: ref('eye'),
            eyeIconConfirmPassword: ref('eye'),

            modalActive: ref(false),
            modalInfo: {
                ...toRefs(modalInfo)
            }
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

        toggleModal(modalType?: string) {
            if(modalType !== undefined)
                this.modalInfo = ModalService.getLoginModalInfo(modalType);
            this.modalActive = !this.modalActive;
        },

        passwordReset() {
            if (this.password !== '' && this.confirmPassword !== '') {
                if (this.password === this.confirmPassword) {
                    this.modalInfo = ModalService.getPassResetModalInfo('success');
                    this.toggleModal();
                } else {
                    this.modalInfo = ModalService.getPassResetModalInfo('mismatchPass');
                    this.toggleModal();
                }
            } else {
                this.modalInfo = ModalService.getPassResetModalInfo('emptyfieldsError');
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
            <ModalBase :type="modalInfo.title" :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
                :border-color="modalInfo.borderColor" @ok-click="toggleModal"/>
        </template>
    </ApresentationLayout>
</template>