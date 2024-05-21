<script lang="ts">
import { defineComponent, ref } from 'vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ContentNavBar from '@/components/NavBars/ContentNavBar.vue';
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue';
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';

import type { NavItem } from '@/models/NavItem';

export default defineComponent({
    components: {
        DefaultLayout,
        ContentNavBar,
        TitlePageDefault,
        ButtonDefault
    },
    data(){
        return {
            items: ref([
                {
                    label:'Informações gerais',
                    route:'/customers/register/generalInfo',
                },
                {
                    label:'Aplicações',
                    route:'/customers/register/apps',
                }
            ] as NavItem[])
        }
    },
    async mounted(){
        const customerId : any = this.$route.params.id;
        
        if(customerId && typeof customerId === 'string' && customerId.trim() !== ''){
            this.items.forEach((item) => {
                item.route = `${item.route}/${encodeURIComponent(customerId)}`
            })
        }
    },
    methods: {
        goBack() {
            this.$router.push('/customers');
        },
    }
});
</script>
<template>
    <DefaultLayout>
        <TitlePageDefault pageTitle="Cadastro de Clientes" />
        <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />
        <div class="flex justify-between mt-6">
            <div clas="flex justify-start">
                <ButtonDefault label="Voltar" class="flex bg-primary text-white rounded-lg"
                    :handle-click="goBack">
                    <div class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                </ButtonDefault>
            </div>

            <div class="flex justify-end">
                <ContentNavBar :items="items" class="flex justify-end" />
            </div>
        </div>
        <RouterView />
    </DefaultLayout>
</template>