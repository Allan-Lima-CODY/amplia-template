<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      checkboxToggle: ref(this.modelValue),
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    },
    readonly: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    updateValue() {
      this.checkboxToggle = !this.checkboxToggle;
      this.$emit('update:modelValue', this.checkboxToggle);
    }
  },
  watch: {
    modelValue(newValue) {
      this.checkboxToggle = newValue;
    },
  }
});

</script>

<template>
  <div>
    <label :for="id" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <div v-if="!readonly">
          <input type="checkbox" :id="id" class="sr-only" :value="checkboxToggle" @input="updateValue" />
          <div :class="checkboxToggle && 'border-primary bg-gray dark:bg-transparent'" class="mr-2.5 flex h-5 w-5 items-center justify-center rounded border">
            <span :class="checkboxToggle && 'bg-primary'" class="h-2.5 w-2.5 rounded-sm"></span>
          </div>
        </div>
        
        <div v-if="readonly">
          <input type="checkbox" :id="id" class="sr-only" />
          <div class="mr-2.5 flex h-5 w-5 items-center justify-center rounded bg-[#c8c8c8]"></div>
        </div>
      </div>
      {{ label }}
    </label>
  </div>
</template>
