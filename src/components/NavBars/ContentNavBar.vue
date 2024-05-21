<script lang="ts">
import { defineComponent } from 'vue';
import NavBarItem from './NavBarItem.vue';
import { useRoute } from 'vue-router';
import type { NavItem } from '@/models/NavItem';


export default defineComponent({
    props:{
        items: Array<NavItem>
    },
    components:{
        NavBarItem
    },
    setup() {
    const route = useRoute();

    const isActive = (routePath : string) => {
        return route.path.includes(routePath);
    };

    return {
      isActive,
    };
  }
});
</script>
<template>
    <nav class="flex gap-2">
        <NavBarItem class="rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
         v-for="(item, index) in items" :item="item" :key="index" :active="isActive(item.route)" :label="item.label" :route="item.route" />
    </nav>
</template>