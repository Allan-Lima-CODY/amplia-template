import type { Address, AddressFields } from "./Address"
import type { Application, ApplicationFields } from "./Application"

export interface Clients { 
    id: Number,
    name: string,
    createdAt: string,
    cnpj: string,
    stateRegistration: string,
    status: string

    contact: string, 
    telefone: string,
    email: string,
    bilingEmail: string,

    address: Address,

    application: Application[]
}

export interface ClientsFields {
    name: string,

    cnpj: string,
    stateRegistration: string,
    status: string,

    contact: string,
    telefone: string,
    email: string,
    bilingEmail: string,

    address: AddressFields,

    application: ApplicationFields
}