import type { AddressFields } from '../models/Address'
import type { Customer, CustomersFields } from '../models/Customer'
import { AddressService } from './AddressService'
import { ApplicationService } from './ApplicationService'
export const CustomersService =
{
    getAllCustomersData(): Customer[] {
        return [
            { id: 1, name: 'Granado', createdAt: '2024-04-24', cnpj: '33500095000161', stateRegistration: 388108598261,  status: 'Ativo', contact: 'Allan Lima', telefone: '32248854851', email: 'allan@teste.com.br', bilingEmail: 'allanbiling@teste.com.br', address: AddressService.getAllAddressData()[0], applications: [ApplicationService.getAllApplicationData()[0]] },
            { id: 2, name: 'FFE', createdAt: '2024-04-23', cnpj: '33500095000162', stateRegistration: 388108598262,  status: 'Inativo', contact: 'Luana Miranda', telefone: '32248854852', email: 'luana@teste.com.br', bilingEmail: 'luanabiling@teste.com.br', address: AddressService.getAllAddressData()[1], applications: [ApplicationService.getAllApplicationData()[1]] },
            { id: 3, name: 'MLL', createdAt: '2024-04-22', cnpj: '33500095000163', stateRegistration: 388108598263,  status: 'Ativo', contact: 'Lislaine', telefone: '32248854853', email: 'lislaine@teste.com.br', bilingEmail: 'lislainebiling@teste.com.br', address: AddressService.getAllAddressData()[2], applications: [ApplicationService.getAllApplicationData()[2]] },
            { id: 4, name: 'Tumtum', createdAt: '2024-04-21', cnpj: '33500095000164', stateRegistration: 388108598264,  status: 'Inativo', contact: 'Giuliano', telefone: '32248854854', email: 'giuliano@teste.com.br', bilingEmail: 'giulianobiling@teste.com.br', address: AddressService.getAllAddressData()[3], applications: [ApplicationService.getAllApplicationData()[3]] },
            { id: 5, name: 'Tamtam', createdAt: '2024-04-20', cnpj: '33500095000165', stateRegistration: 388108598265, status: 'Ativo', contact: 'Matheus', telefone: '32248854855', email: 'matheus@teste.com.br', bilingEmail: 'matheusbiling@teste.com.br', address: AddressService.getAllAddressData()[4], applications: [ApplicationService.getAllApplicationData()[4]] },
            { id: 6, name: 'Papum', createdAt: '2024-04-19', cnpj: '33500095000166', stateRegistration: 388108598266,  status: 'Inativo', contact: 'Andrey', telefone: '32248854856', email: 'andrey@teste.com.br', bilingEmail: 'andreybiling@teste.com.br', address: AddressService.getAllAddressData()[5], applications: [ApplicationService.getAllApplicationData()[5]] }
        ]
    },

    getAllCustomers(): Promise<Customer[]> {
        return Promise.resolve(this.getAllCustomersData())
    },

    defaultFields(): CustomersFields {
        return {
            name: '',

            cnpj: '',
            stateRegistration: null,
            status: true,
        
            contact: '',
            telefone: '',
            email: '',
            bilingEmail: '',
        
            address: AddressService.defaultFields() as AddressFields,
        }
    },

    toFields(customer : Customer) : CustomersFields{
        return{
            name: customer.name,
            cnpj: customer.cnpj,
            stateRegistration: customer.stateRegistration,
            status: customer.status === "Ativo",
            contact: customer.contact,
            telefone: customer.telefone,
            email: customer.email,
            bilingEmail: customer.bilingEmail,
            address: customer.address
        }
    }
}