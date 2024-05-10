import type { Plans, PlansFields } from "./Plans"
import type { Clients, ClientsFields } from "./Client"

export interface Application { 
    id: Number,
    createdAt: Date,

    plan: Plans,
    planPrice: Number,
    additionalPrice: Number,

    status: string,

    contractedLicenses: Number,
    pricePerLicense: Number

    effectiveDate: Date,
    nextBillingDate: Date,

    clientId: Number
}

export interface ApplicationFields {
    plan: PlansFields,
    planPrice: Number | null,
    additionalPrice: Number | null,

    status: string,

    contractedLicenses: Number | null,
    pricePerLicense: Number | null

    effectiveDate: Date,
    nextBillingDate: Date,

    clientId: Number | null
}
