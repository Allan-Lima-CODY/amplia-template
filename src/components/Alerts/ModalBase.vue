<script lang="ts">
import '@/assets/css/modal-transition.css'
import ButtonModal from '@/components/Buttons/ButtonModal.vue';

export default {
    components: {
        ButtonModal
    },
    emits: ['ok-click', 'no-click'],
    props: {
        okTitle:{
            type: String
        },
        noTitle:{
            type: String
        },
        message: {
            type: String,
            required: true
        },
        modalActive: {
            type: Boolean,
            defaut: false,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        borderColor: {
            type: String,
            required: true
        }
    },
    methods: {
        handleOkClick() {
            this.$emit('ok-click');
        },
        handleNoClick(){
            this.$emit('no-click');
        }
    }
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">

                <Transition name="modal-inner">
                    <div v-show="modalActive"
                        :style="{borderColor: borderColor}"
                        :class="`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center border-l-6 px-7 py-8 shadow-md bg-slate-100 dark:bg-[#676767] md:p-9 max-w-[550px] max-h-[400px] overflow-y-auto break-words z-50`">

                        <div class="flex mr-15">
                            <div :class="`mr-5 flex h-9 w-full max-w-[36px] min-w-[36px] items-center justify-center rounded-lg`" :style="{backgroundColor: borderColor}">
                                <svg v-if="title === 'Sucesso!' || title === undefined" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                                        fill="white" stroke="white"></path>
                                </svg>
                                <svg v-else-if="title === 'Erro'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" fill="white" stroke="white"/>
                                </svg>
                                <svg v-else-if="title === 'Alerta'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" stroke="white" />
                                </svg>
                            </div>
                            <div class="w-full">
                                <h5 class="mb-3 text-lg font-bold text-black dark:text-white">
                                    {{ title }}
                                </h5>
                                <p class="text-base leading-relaxed text-body dark:text-white">
                                    {{ message }}
                                </p>
                            </div>
                        </div>

                        <div class="w-full gap-2 mt-10 flex justify-end">
                            <ButtonModal :label="okTitle ?? 'OK'" :buttonColor="borderColor" @click-event="handleOkClick" />
                            <ButtonModal v-if="noTitle !== undefined && noTitle !== null" :label="noTitle ?? ''" :buttonColor="borderColor" @click-event="handleNoClick" />
                            <slot name="slot2" />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>