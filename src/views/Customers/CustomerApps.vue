<script lang="ts">
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
import DataTableMain from '@/components/Mains/DataTableMain.vue';
import DataTable from 'primevue/datatable';
import { defineComponent } from 'vue';
export default defineComponent(
    {
        components:{
            DataTableMain,
            DataTable,
            ButtonDefault
        }
     });
</script>
<template>

    <div class="flex justify-end mt-5">
        <ButtonDefault label="Cadastrar" class="flex bg-primary text-white rounded-lg" route="/customers/register/apps/register"/>
    </div>
    
    <DataTableMain>
        <DataTable>
        <!-- listagem que o allan fez -->
        </DataTable>
    </DataTableMain>
</template>