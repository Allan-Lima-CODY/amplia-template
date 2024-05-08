<script lang="ts">
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <label class="block mb-1 text-sm font-small text-red" :class="color">
        {{ label }}
    </label>
</template>