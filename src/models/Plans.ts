import type { Feature } from "./Feature"

export interface Plans { 
    id: Number,
    name: string,
    createdAt: Date,

    product: string,
    price: number
    
    features: Feature[]
}

export interface PlansFields {
    name: string,

    price: number | null,
    product: any,

    features: Feature[]
}