import { useFormDataStore } from "@/stores/formData";
import type { RouteLocationNormalized } from "vue-router";

export default function FormDataService() {

  const resetFormDataOnRouteChange = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const baseFrom = from.fullPath.split('/')[2];
    const baseTo = to.fullPath.split('/')[2];
    if (baseFrom !== baseTo) {
      useFormDataStore().resetFormData();
      useFormDataStore().resetArray();
      useFormDataStore().updateLastId(0);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = useFormDataStore().formData;
      
    //   const response = await fetch('your-api-endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return {
    handleSubmit, resetFormDataOnRouteChange
  };
}
