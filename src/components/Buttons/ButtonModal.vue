<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    buttonColor: {
      type: String,
      default: '#34D399'
    },
    handleClick: Function
  },
  emits: ['click-event'],
  methods: {
    setOpacity(event: any, opacity: number) {
      event.target.style.opacity = opacity;
    }
  }
};
</script>

<template>
  <input type="button" 
         :value="label"
         @click="handleClick ? handleClick() : $emit('click-event')" 
         :class="`cursor-pointer rounded-lg p-4 font-medium text-white`" 
         :style="{borderColor: buttonColor, backgroundColor: buttonColor}"
         @mouseover="setOpacity($event, 0.8)"
         @mouseleave="setOpacity($event, 1)" />
</template>