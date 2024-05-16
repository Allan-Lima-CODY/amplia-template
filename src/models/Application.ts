import type { Plans, PlansFields } from "./Plans"

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
    
    product: string | null,
    plan: PlansFields,
    planPrice: Number | null,
    additionalPrice: Number | null,

    status: boolean,

    contractedLicenses: Number | null,
    pricePerLicense: Number | null

    effectiveDate: Date,
    nextBillingDate: Date

    totalPrice: Number | null
}
