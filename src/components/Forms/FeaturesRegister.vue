<script lang="ts">

import type { Option } from '@/models/Option';
import { defineComponent, ref } from 'vue';
import DefaultCard from '@/components/Forms/DefaultCard.vue';
import ButtonApresentation from '@/components/Buttons/ButtonPresentation.vue';
import DropDownMenu from '@/components/Forms/DropDownMenu.vue';
import InputForms from '@/components/Forms/InputFields/InputForms.vue';
import LabelFields from '@/components/Forms/Labels/LabelFields.vue';
import type { Feature } from '@/models/Feature';

export default defineComponent({
    components: {
        InputForms,
        DefaultCard,
        ButtonApresentation,
        DropDownMenu,
        LabelFields
    },
    emits: ['register'],
    props: {
        products:{
          type: Array as () => Option[],
          required: true  
        } 
    },
    data() {
        return {
            selectedProduct: ref(''),
            featureName: ref('')
        }
    },
    methods: {
        register() {
            this.$emit("register", { name:this.featureName, product:this.selectedProduct, createdAt: new Date() } as Feature);
        }
    }
});
</script>
<template>
    <form @submit.prevent="register" class="rounded-lg border mt-6 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full flex justify-start">
        <DefaultCard class="w-full" disableHeader>
            <div class="p-6 grid grid-cols-2">
                <div class="flex justify-start gap-10">
                    <div>
                        <LabelFields label="Nome da funcionalidade" for-html="featureName" />
                        <InputForms v-model="featureName" id="featureName" type="text" placeholder="Digite seu nome" />
                    </div>
                    <div>
                        <LabelFields label="Produto" for-html="product"/>
                        <DropDownMenu v-model="selectedProduct" id="product" :options="products"/>
                    </div>
                </div>
                <div class="flex justify-end mt-2">
                    <ButtonApresentation label="+ Adicionar"/>
                </div>
            </div>
        </DefaultCard>
    </form>
</template>