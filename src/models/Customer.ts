import type { Address, AddressFields } from "./Address"
import type { Application } from "./Application"

export interface Customer { 
    id: Number,
    name: string,
    createdAt: string,
    cnpj: string,
    stateRegistration: number,
    status: string,

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
    stateRegistration: number | null,
    status: boolean,

    contact: string,
    telefone: string,
    email: string,
    bilingEmail: string,

    address: AddressFields
}