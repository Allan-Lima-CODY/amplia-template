import type { Address, AddressFields } from "./Address"
import type { Application, ApplicationFields } from "./Application"

export interface Customer { 
    id: Number,
    name: string,
    createdAt: string,
    cnpj: string,
    stateRegistration: string,
    status: boolean,

    contact: string, 
    telefone: string,
    email: string,
    bilingEmail: string,

    address: Address,

    applications: Application[]
}

export interface CustomersFields {
    name: string,

    cnpj: string,
    stateRegistration: string,
    status: boolean,

    contact: string,
    telefone: string,
    email: string,
    bilingEmail: string,

    address: AddressFields,

    applications: ApplicationFields[]
}