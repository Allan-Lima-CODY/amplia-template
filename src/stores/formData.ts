import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('formData', {
    state: () => ({
      formData: {},
      arrayData: []
    }),
    actions: {
      updateFormData(newData : any) {
        this.formData = { ...this.formData, ...newData };
      },
      reset(){
        this.formData = {}
      },
      updateArrayData(newData : any) {
        this.arrayData = { ...this.arrayData, ...newData };
      },
      resetArray(){
        this.arrayData = []
      }
    },
  });