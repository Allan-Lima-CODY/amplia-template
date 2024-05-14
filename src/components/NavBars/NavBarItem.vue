<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';


export default defineComponent({
    components:{
        RouterLink
    },
    props: {
        label: String,
        route: {
            type: String,
            required: true
        },
        active: Boolean,
  },
});
</script>
<template>
        <RouterLink :to="route" class="rounded-lg bg-slate-500 dark:bg-box-dark text-white" :class="{ 'opacity-50': active }">
            {{ label }}
        </RouterLink>
</template>