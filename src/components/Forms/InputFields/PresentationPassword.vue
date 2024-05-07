<script lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faEye, faEyeSlash, faUser)

export default {
    components: {
        FontAwesomeIcon
    },
    emits:['passwordChanged'],
    data() {
        return {
            inputType: ref('password'),
            eyeIcon: ref('eye'),
            password: ref('')
        };
    },
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
            this.eyeIcon = this.inputType === 'password' ? 'eye' : 'eye-slash';
        }
    },
    watch: {
        password(newPassword) {
            this.$emit('passwordChanged', newPassword);
        }
    }
}
</script>

<template>
    <div>
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
        <div class="relative">
            <input :id="id" :type="inputType" v-model="password"
                class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white" />
            <button @click.prevent="togglePasswordVisibility" class="absolute right-4 top-4 cursor-pointer">
                <font-awesome-icon :icon="eyeIcon" size="lg" style="color: #bebebe;" />
            </button>
        </div>
    </div>

    <slot />
</template>