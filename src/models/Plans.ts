export interface Plans { 
    id: number,
    name: string,
    createdAt: Date,
    product: string,
    price: number
}

export interface PlansFields {
    name: string,
    price: number | undefined,
    product: any
}

export interface PlansFeature {
    id: number,
    idPlans: number,
    idFeatures: number
}