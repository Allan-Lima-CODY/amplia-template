import type { Plans } from "./Plans"

export interface Application { 
    id: Number
    createdAt: Date

    plan: Plans
    planPrice: Number
    additionalPrice: Number

    status: string

    contractedLicenses: Number
    pricePerLicense: Number

    effectiveDate: Date
    nextBillingDate: Date

    totalPrice: Number
}

export interface ApplicationFields {
    id: number | null,
    
    product: string | null,
    plan: string | null,
    planPrice: Number | null,
    additionalPrice: Number | null,

    status: boolean,

    contractedLicenses: Number | null,
    pricePerLicense: Number | null

    effectiveDate: Date | null,
    nextBillingDate: Date | null,

    totalPrice: Number | null
}
