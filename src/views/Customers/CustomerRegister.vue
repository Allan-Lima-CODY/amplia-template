<script lang="ts">
import { defineComponent, ref } from 'vue';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ContentNavBar from '@/components/NavBars/ContentNavBar.vue';
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue';

import type { NavItem } from '@/models/NavItem';

export default defineComponent({
    components:{
        DefaultLayout,
        ContentNavBar,
        TitlePageDefault
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
    }
});
</script>
<template>
    <DefaultLayout>
        <TitlePageDefault pageTitle="Cadastro de Clientes" />
        <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />
        <ContentNavBar :items="items" class="mt-6" />
        <RouterView />
    </DefaultLayout>
</template>