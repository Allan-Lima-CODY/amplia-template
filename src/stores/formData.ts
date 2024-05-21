import { defineStore } from 'pinia';

export const useFormDataStore = defineStore('formData', {
    state: () => ({
      formData: {},
      arrayData: [] as any[],
      lastId: 0 as number
    }),
    actions: {
      updateFormData(newData : any) {
        this.formData = { ...this.formData, ...newData };
      },
      resetFormData(){
        this.formData = {}
      },
      updateArrayData(newData : any[]) {
        this.arrayData = [ ...this.arrayData, ...newData ];
      },
      addToArrayData(newData : any){
        this.arrayData.push(newData);
      },
      resetArray(){
        this.arrayData = [];
      },
      updateLastId(lastId : number){
        this.lastId = lastId;
      }
    },
  });