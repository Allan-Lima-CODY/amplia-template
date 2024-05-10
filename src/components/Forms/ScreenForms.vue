<script lang="ts">
export default {
  props: {
    handle: Function
  },
    methods: {
        handleMethod() {
            if (this.handle) {
                this.handle();
            }
        }
    }
};
</script>

<template>
    <form @submit.prevent="handleMethod">
        <div class="mt-6 grid grid-cols-1 gap-9 sm:grid-cols-2">
            <slot/>
        </div>
    </form>
</template>