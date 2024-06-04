<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },
    route: {
      type: String,
      default: ''
    },
    customClasses: {
      type: String,
      default: ''
    },
    handleClick: Function
  }
};
</script>

<template>
  <button
  type="button"
    :to="{ path: route }"
    class="p-4 text-center font-medium text-sm transition hover:bg-opacity-90"
    :class="customClasses"
    @click="handleClick ? handleClick() : $router.push({ path: route })"
  >
    <slot></slot>
    {{ label }}
  </button>
</template>
