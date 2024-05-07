<script lang="ts">
export default {
    data() {
        return {
            
        };
    },
    props: {
        id: {
            type: String,
            required: true
        },
        placeholder: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        modelValue: {
            required: true
        }
    },
    methods:{
        updateValue(event: any) {
            this.$emit("update:modelValue", event.target.value);
        }
    }
}
</script>

<template>
    <input :id="id" :type="type" :placeholder="placeholder" :value="modelValue"
        @input="updateValue" v-bind="$attrs"
        class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent p-2.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />

    <slot />
</template>