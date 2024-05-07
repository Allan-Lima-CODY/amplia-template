<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TitlePageDefault from '@/components/Titles/TitlePageDefault.vue'
</script>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import { GenericFunctions } from '@/services/GenericFunctions'

import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'

import type { Users } from '@/models/Users'
import { UserService } from '@/services/UsersService'
import type { Option } from '@/models/Option'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

library.add(faPlus, faArrowLeft, faEye, faEyeSlash)

export default defineComponent({
  components: {

  },
  data() {
    return {
      pageTitle: ref('Usuários'),

      users: [] as Users[],
      selectedUser: null as any,
      loading: ref(true),
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.EQUALS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        createdAt: { value: null, matchMode: FilterMatchMode.DATE_IS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
      },
      statusOptions: [{
        key: 1,
        value: 'Ativo'
      },
      {
        key: 2,
        value: 'Inativo'
      }
      ] as Option[],
    }
  },
  mounted() {
    UserService.getAllUsers().then((data: Users[]) => {
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
      console.log(event.data.id)
      
      // this.$router.push(`/users/register/${GenericFunctions.encryptIdentifier(event.data.id)}`);
      this.$router.push(`/users/register/${encodeURIComponent(GenericFunctions.encryptIdentifier(event.data.id))}`)
    }
  }
});
</script>

<template>
  <DefaultLayout>

    <TitlePageDefault :pageTitle="pageTitle">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="w-6 h-6 me-4 mt-1">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    </TitlePageDefault>

    <div class="bg-[#d1d1d1] w-full h-0.5 rounded-lg mb-3" />

    <div class="flex justify-end mt-6">
      <ButtonDefault class="flex bg-primary text-white rounded-lg" route="/users/register">
        <div class="mr-2">
          <font-awesome-icon :icon="['fas', 'plus']" size="sm" style="color: #FFFFFF;" />
        </div>
        Cadastrar Usuário
      </ButtonDefault>
    </div>

    <div
      class="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-6">
      <div class="max-w-full rounded-lg overflow-x-auto">

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
              <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" :manual-input="false" @date-select="filterCallback()"
                placeholder="dd/mm/yyyy" mask="99/99/9999" inputClass="p-2"  />
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

          <Column header="Ações" :rowEditor="true" style="width: 5%; min-width: 8rem"></Column>
        </DataTable>

      </div>
    </div>
  </DefaultLayout>
</template>