import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

const app = createApp(App)

window.addEventListener('storage', (event) => {
    if (event.key === 'loginEvent') {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        if (loggedInUser) {
            router.push('/home');
        } else {
            router.push('/');
        }
    }

    if (event.key === 'logoutEvent') {
        router.push('/');
    }
});

app.use(createPinia())
app.use(router)
app.use(VueApexCharts),
app.use(PrimeVue, {
    locale: {
        //Filters
        startsWith: 'Começa por',
        contains: 'Contém',
        notContains: 'Não contém',
        endsWith: 'Termina por',
        equals: 'Igual a',
        notEquals: 'Diferente de',
        noFilter: 'Sem filtro',
        dateIs: 'Data é',
        dateBefore: 'Antes de',
        dateAfter: 'Depois de',
        dateIsNot: 'Data não é',

        //Filter Calendar
        dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
        firstDayOfWeek: 0,
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    }
});
app.mount('#app')