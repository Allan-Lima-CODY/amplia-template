<script lang="ts">
import { ref, reactive, toRefs } from 'vue'

import type { ModalInfo } from '@/models/ModalInfo'

import { ModalService } from '@/services/ModalService'

import ModalBase from '@/components/Alerts/ModalBase.vue'
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import ApresentationLayout from '@/layouts/PresentationLayout.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue'
import InputForms from '@/components/Forms/InputFields/InputForms.vue'
import VisibilityButton from '@/components/Buttons/VisibilityButton.vue'

import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher.vue'


export default {
    components: {
        ModalBase,
        ButtonApresentation,
        ApresentationLayout,
        LabelFields,
        InputForms,
        DarkModeSwitcher,
        VisibilityButton
    },
    data() {
        const modalInfo: ModalInfo = reactive(ModalService.getLoginModal());
        return {
            password: ref(''),
            confirmPassword: ref(''),

            inputPassword: ref('password'),
            inputConfirmPassword: ref('password'),

            eyeIconVisiblePassword: ref(true),
            eyeIconVisibleConfirmPassword: ref(true),

            modalActive: ref(false),
            modalInfo: ref({
                ...toRefs(modalInfo)
            })
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.inputPassword = this.inputPassword === 'password' ? 'text' : 'password';

            this.eyeIconVisiblePassword = !this.eyeIconVisiblePassword
        },

        toggleConfirmPasswordVisibility() {
            this.inputConfirmPassword = this.inputConfirmPassword === 'password' ? 'text' : 'password';

            this.eyeIconVisibleConfirmPassword = !this.eyeIconVisibleConfirmPassword
        },

        toggleModal(modalType?: string) {
            if (modalType !== undefined)
                this.modalInfo = ModalService.getLoginModal(modalType);
            this.modalActive = !this.modalActive;
        },

        passwordReset() {
            if (this.password !== '' && this.confirmPassword !== '') {
                if (this.password === this.confirmPassword) {
                    this.modalInfo = ModalService.getPassResetModal('success');
                    this.toggleModal();
                } else {
                    this.modalInfo = ModalService.getPassResetModal('mismatchPass');
                    this.toggleModal();
                }
            } else {
                this.modalInfo = ModalService.getPassResetModal('emptyfieldsError');
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
    <ApresentationLayout card-title="Altere sua senha" :handle="passwordReset">
        <template v-slot:slot1>

            <div>
                <div class="relative">
                    <LabelFields label="Senha" for-html="password"></LabelFields>
                    <InputForms id="password" :type="inputPassword" placeholder="Digite sua senha" v-model="password">
                        <VisibilityButton :eyeIconVisible="eyeIconVisiblePassword" @toggle-visibility="togglePasswordVisibility" />
                    </InputForms>
                </div>
            </div>

            <div>
                <div class="relative">
                    <LabelFields label="Confirmar Senha" for-html="password"></LabelFields>
                    <InputForms id="confirmPassword" :type="inputConfirmPassword" placeholder="Confirme sua senha"
                        v-model="confirmPassword">
                        <VisibilityButton :eyeIconVisible="eyeIconVisibleConfirmPassword" @toggle-visibility="toggleConfirmPasswordVisibility" />
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
            <ModalBase :message="modalInfo.message" :modal-active="modalActive" :title="modalInfo.title"
                :border-color="modalInfo.borderColor" @ok-click="toggleModal" />
        </template>
    </ApresentationLayout>
</template>