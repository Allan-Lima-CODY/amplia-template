<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        placeholder: String,
        readonly: Boolean,
        modelValue: Number
    },
    data() {
        return {
            amount: ''
        };
    },
    watch: {
        modelValue(newValue){
            this.amount = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(parseFloat(newValue));
        }
    },
    methods: {
        updateValue(event: any) {
            let newValue = event.target.value.replace(/[^0-9]/g, '');
            if (newValue === '') {
                newValue = '0';
            }
            
            newValue = newValue.padStart(3, '0');
            
            const formattedAmount = newValue.slice(0, -2) + '.' + newValue.slice(-2);

            this.amount = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(parseFloat(formattedAmount));
            
            this.$emit("update:modelValue", parseFloat(formattedAmount));
        },
        checkDigit(event: any){
            if (event.key.length === 1 && isNaN(Number(event.key))) {
                event.preventDefault();
            }
        }
    }
});
</script>

<template>
    <input 
        :value="amount"
        @input="updateValue" 
        @keydown="checkDigit"
        :readonly="readonly"
        :placeholder="placeholder" 
        class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        :class="readonly ? 'text-slate-400' : 'text-black dark:text-white'"
    />
</template>