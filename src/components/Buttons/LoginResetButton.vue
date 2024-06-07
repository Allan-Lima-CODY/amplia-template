<script lang="ts">
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        click: Function
    },
    methods: {
        handleClick() {
            if (this.click) {
                this.click();
            }
        }
    }
};
</script>

<template>
    <div class="">
        <input type="submit" :value="label" @click="handleClick"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90" />
        <slot />
    </div>
</template>