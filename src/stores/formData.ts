import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('formData', {
    state: () => ({
      formData: {},
    }),
    actions: {
      updateFormData(newData : any) {
        this.formData = { ...this.formData, ...newData };
      },
      reset(){
        this.formData = {}
      }
    },
  });