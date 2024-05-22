import type { Address, AddressFields } from '../models/Address'
export const AddressService =
{
    getAllAddressData(): Address[] {
        return [
            { id: 1, createdAt: '2024-04-24', cep: '59612070', state: 'São Paulo', city: 'Jundiaí', district: 'Santa Gertrudes', address: 'Rua braba', number: 1, additionalInfo: 'do lado daquela outra rua' },
            { id: 2, createdAt: '2024-04-23', cep: '71620080', state: 'Rio Grande do Sul', city: 'Niterói', district: 'TalBairro', address: 'A tal da rua', number: 2, additionalInfo: 'essa mesmo'  },
            { id: 3, createdAt: '2024-04-22', cep: '55018141', state: 'Paraná', city: 'Curitiba', district: 'UmbairroAi', address: 'Rua tal', number: 3, additionalInfo: 'na frente da tal casa'  },
            { id: 4, createdAt: '2024-04-21', cep: '50110090', state: 'Santa Catarina', city: 'Bauneario Camburiú', district: 'OutroBairro', address: 'Aquela rua', number: 4, additionalInfo: 'do lado daquela casa'  },
            { id: 5, createdAt: '2024-04-20', cep: '29176400', state: 'Rio Grande do Sul', city: 'Porto Alegre', district: 'MaisUmBairro', address: 'Avenida', number: 5, additionalInfo: ''  },
            { id: 6, createdAt: '2024-04-19', cep: '68906502', state: 'Mato Grosso', city: 'Cáceres', district: 'OBairro', address: 'Rodovia', number: 6, additionalInfo: 'sim'  }
        ]
    },

    defaultFields(): AddressFields {
        return {
            cep: '',
            additionalInfo: '',
            state: '',
            city: '',
            district: '', 
            address: '',
            number: null
        }
    }
}