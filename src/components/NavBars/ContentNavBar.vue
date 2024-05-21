<script lang="ts">
import { defineComponent } from 'vue';
import NavBarItem from './NavBarItem.vue';
import { useRoute } from 'vue-router';


export default defineComponent({
    components:{
        NavBarItem
    },
    setup() {
    const route = useRoute();

    const isActive = (routePath : string) => {
      return route.path === routePath;
    };

    return {
      isActive,
    };
  },
    data(){
        return{
            items: [
                {
                    label:'Informações gerais',
                    route:'/customers/register/generalInfo',
                },
                {
                    label:'Aplicações',
                    route:'/customers/register/apps',
                }
            ]
        }
    }
});
</script>
<template>
    <nav class="flex gap-2">
        <NavBarItem class="rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary"
         v-for="(item, index) in items" :item="item" :key="index" :active="isActive(item.route)" :label="item.label" :route="item.route" />
    </nav>
</template>