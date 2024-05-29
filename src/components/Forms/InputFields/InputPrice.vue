<script lang="ts">
import InputNumber from 'primevue/inputnumber';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
        InputNumber
    },
    props:{
        placeholder: String,
        readonly: Boolean
    }
})

</script>
<template>
    <InputNumber :readonly="readonly" prefix="R$" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="2" :placeholder="placeholder" class="w-full" :inputClass="`
        rounded-lg border-[1.5px] border-stroke bg-transparent p-3.5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
        ${readonly ? 'text-slate-400' : 'text-black dark:text-white'}
      `">
        <slot/>
    </InputNumber>
</template>