<script lang="ts">
export default {
  props: {
    cardTitle: {
      type: String,
      required: true
    },
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
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img src="@/assets/images/logo/logo-login.png" alt="Logo" />
      </a>

      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Bem-vindo(a) de volta! 👋🏼
      </label>
      
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {{ cardTitle }}
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleMethod">

            <slot name="slot1"/>

          </form>
        </div>
      </div>

      <slot name="slot2"/>

    </div>
  </section>
</template>
