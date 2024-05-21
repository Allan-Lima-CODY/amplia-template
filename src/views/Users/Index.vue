<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'
import type { User } from '@/models/User'
import { UserService } from '@/services/UsersService'
import type { Option } from '@/models/Option'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import { FilterMatchMode } from 'primevue/api';
import DataTableMain from '@/components/Mains/DataTableMain.vue'

export default defineComponent({
  components: {
    ButtonDefault,
    DataTable,
    Column,
    Tag,
    InputText,
    Dropdown,
    Calendar
  },
  data() {
    return {
      pageTitle: ref('Usuários'),

      users: ref([] as User[]),
      selectedUser: ref(null as any),

      loading: ref(true),

      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
      }),
      
      statusOptions: ref([{
        key: 1,
        value: 'Ativo'
      },
      {
        key: 2,
        value: 'Inativo'
      }
      ] as Option[]),
    }
  },
  mounted() {
    UserService.getAllUsers().then((data: User[]) => {
      this.users = this.getUsers(data);
    })

    this.loading = false;
  },
  methods: {
    getSeverity(status: string) {
      switch (status) {
        case 'Inativo':
          return 'danger';

        case 'Ativo':
          return 'success';
      }
    },

    getUsers(data: any) {
      return [...(data || [])].map((d) => {
        d.createdAt = new Date(d.createdAt);

        return d;
      });
    },

    onEditing(event: any) {
      this.$router.push(`/users/register/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
    }
  }
});
</script>

<template>
  <DefaultLayout>

    <TitlePageDefault :pageTitle="pageTitle" />

    <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />

    <div class="flex justify-end mt-6">
      <ButtonDefault label="Cadastrar Usuário" class="flex bg-primary text-white rounded-lg" route="/users/register">
        <div class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </ButtonDefault>
    </div>

    <DataTableMain>
      <DataTable v-model:filters="filters" :value="users" stripedRows paginator @row-edit-init="onEditing"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" :rows="10" filterDisplay="row"
        :loading="loading" :globalFilterFields="['name', 'createdAt', 'status']" editMode="row" dataKey="id"
        :pt="{ table: { style: 'min-width: 50rem' } }">
        <template #empty> Nenhum usuário foi encontrado. </template>
        <template #loading> Carregando usuários... </template>

        <Column field="id" header="Código" style="width: 5%">
          <template #body="{ data }">
            {{ data.id }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="font-normal p-2"
              placeholder="ID" />
          </template>
        </Column>

        <Column field="name" header="Nome" style="width: 15%">
          <template #body="{ data }">
            {{ data.name }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="font-normal p-2"
              placeholder="Filtrar por nome" />
          </template>
        </Column>

        <Column field="createdAt" header="Data de Criação" filterField="createdAt" dataType="date" style="width: 15%">
          <template #body="{ data }">
            {{ GenericFunctions.formatDate(data.createdAt) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false"
              @date-select="filterCallback()" placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2" />
          </template>
        </Column>

        <Column field="status" header="Status" :showFilterMenu="false" style="width: 15%">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="getSeverity(data.status)" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statusOptions.map(s => s.value)"
              placeholder="Selecionar" class="p-column-filter" style="min-width: 10rem" :showClear="true">
              <template #option="slotProps">
                <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
              </template>
            </Dropdown>
          </template>
        </Column>

        <Column header="Editar" :rowEditor="true" style="width: 5%; min-width: 8rem"></Column>
      </DataTable>
    </DataTableMain>
  </DefaultLayout>
</template>