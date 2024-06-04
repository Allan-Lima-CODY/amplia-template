<script lang="ts">
import InputNumber from 'primevue/inputnumber';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
        InputNumber
    },
    props:{
        placeholder: String,
        readonly: Boolean,
        modelValue: Number
    },
  methods:{
    updateValue(event: any){
        if(this.amount === 0)
            this.amount = event.value;
        else
            this.amount = event.value * 1000;
        const formattedAmount = (this.amount / 100);
        this.$emit("update:modelValue", formattedAmount);
    }
  },
  data(){
    return{
        amount: 0
    }
  }
})

</script>
<template>
    <InputNumber :modelValue="modelValue" @input="updateValue" locale="pt-BR" :useGrouping="false" prefix="R$" :readonly="readonly" :placeholder="placeholder" class="w-full" :inputClass="`
        rounded-lg border-[1.5px] border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
        ${readonly ? 'text-slate-400' : 'text-black dark:text-white'}`">
        <slot/>
    </InputNumber>
</template>