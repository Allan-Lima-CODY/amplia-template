export interface Address { 
    id: Number,
    createdAt: string,
    cep: string,
    
    state: string,
    city: string,
    district: string, 
    address: string,
    number: number
}

export interface AddressFields {
    cep: string,
    
    state: any,
    city: string,
    district: string, 
    address: string,
    number: Number | null
}
