<script lang="ts">
import { ref } from 'vue'
import type { Option } from '@/models/Option';

export default {
  data() {
    return {
      selectedOption: ref(this.modelValue),
      isOptionSelected: ref(false)
    }
  },
  props: {
    options: {
      type: Array as () => Option[],
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    unselectLabel: String
  },
  methods: {
    updateValue(event?: any) {
      if(this.selectedOption !== '')
        this.isOptionSelected = true;

      this.selectedOption = event.target.value
      this.$emit("update:modelValue", this.selectedOption);
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedOption = newValue;
    },
  }
};
</script>

<template>
    <div class="relative z-20 bg-transparent dark:bg-form-input">
      <select :value="selectedOption"
        class="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent p-3.5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        :class="{ 'text-black dark:text-white': isOptionSelected }" @change="updateValue">
        <option value="" disabled selected>{{ unselectLabel }}</option>
        <option v-for="option in options" :key="option.key" :value="option.value">{{ option.value }}</option>
      </select>

      <span class="absolute top-1/2 right-4 z-30 -translate-y-1/2">
        <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.8">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
              fill=""></path>
          </g>
        </svg>
      </span>
    </div>
</template>
