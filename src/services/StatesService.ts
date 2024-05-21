import type { State } from '../models/States'
export const StateService =
{
    getAllStatesData(): State[] {
        return [
            { id: 1, name: 'Acre' },
            { id: 2, name: 'Alagoas' },
            { id: 3, name: 'Amapá' },
            { id: 4, name: 'Amazonas' },
            { id: 5, name: 'Bahia' },
            { id: 6, name: 'Ceará' },
            { id: 7, name: 'Espírito Santo' },
            { id: 8, name: 'Goiás' },
            { id: 9, name: 'Maranhão' },
            { id: 10, name: 'Mato Grosso' },
            { id: 11, name: 'Mato Grosso do Sul' },
            { id: 12, name: 'Minas Gerais' },
            { id: 13, name: 'Pará' },
            { id: 14, name: 'Paraíba' },
            { id: 15, name: 'Paraná' },
            { id: 16, name: 'Pernambuco' },
            { id: 17, name: 'Piauí' },
            { id: 18, name: 'Rio de Janeiro' },
            { id: 19, name: 'Rio Grande do Norte' },
            { id: 20, name: 'Rio Grande do Sul' },
            { id: 21, name: 'Rondônia' },
            { id: 22, name: 'Roraima' },
            { id: 23, name: 'Santa Catarina' },
            { id: 24, name: 'São Paulo' },
            { id: 25, name: 'Sergipe' },
            { id: 26, name: 'Tocantins' },
            { id: 27, name: 'Distrito Federal' }
        ]
    },

    getAllStates(): Promise<State[]> {
        return Promise.resolve(this.getAllStatesData())
    },
}