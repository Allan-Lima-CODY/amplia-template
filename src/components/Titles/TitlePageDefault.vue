<script lang="ts">
import { defineComponent } from 'vue';
import { MenuItemsService } from '@/services/MenuItemsService';

export default defineComponent({
  props:{
    pageTitle:{
      type: String
    }
  },
  methods:{
    getIcon(title: string | undefined){
      return MenuItemsService.getMenuItems().find(i => title?.includes(i.label?.toString() ?? ""))?.icon;
    }
  }
});
</script>

<template>
  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 class="flex items-center gap-2 text-title-md2 font-semibold text-black dark:text-white">
      <div v-html="getIcon(pageTitle)"/>
      {{ pageTitle }}
    </h2>
  </div>
</template>
