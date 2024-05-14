<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { Customer } from '@/models/Customer';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ContentNavBar from '@/components/NavBars/ContentNavBar.vue';

export default defineComponent({
    components:{
        DefaultLayout,
        ContentNavBar,
    },
    methods:{
        handleRegister(){

        }
    },
    data(){
        return {
            customer: {} as Customer,
            customerStatus: ref(false),
            emailValid: ref(true),
            cnpjValid: ref(true),
        }
    },
});
</script>
<template>
    <DefaultLayout>
    
        <ContentNavBar />
        <RouterView />

    </DefaultLayout>
</template>