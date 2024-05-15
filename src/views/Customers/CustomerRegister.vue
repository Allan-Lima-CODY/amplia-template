<script lang="ts">
import { defineComponent } from 'vue';


import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ContentNavBar from '@/components/NavBars/ContentNavBar.vue';
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue';

export default defineComponent({
    components:{
        DefaultLayout,
        ContentNavBar,
        TitlePageDefault
    },
});
</script>
<template>
    <DefaultLayout>
        <TitlePageDefault pageTitle="Cadastro de Clientes" />
        <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />
        <ContentNavBar class="mt-6" />
        <RouterView />
    </DefaultLayout>
</template>