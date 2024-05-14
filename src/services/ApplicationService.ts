import type { Plans, PlansFields } from '@/models/Plans'
import type { Application, ApplicationFields } from '../models/Application'
import { PlansService } from './PlansService'
import { CustomersService } from './CustomersService'
import type { CustomersFields } from '@/models/Customer'
export const ApplicationService =
{
    getAllApplicationData(): Application[] {
        return [
            { id: 1, createdAt: new Date('2024-04-24'), plan: PlansService.getAllPlansData()[0], additionalPrice: 199.99, planPrice: 199.99, status: 'Ativo', contractedLicenses: 1, pricePerLicense: 199.99, effectiveDate: new Date('2024-04-24'), nextBillingDate: new Date('2024-04-24'), clientId: 1 },
            { id: 2, createdAt: new Date('2024-04-23'), plan: PlansService.getAllPlansData()[1], additionalPrice: 299.99, planPrice: 299.99, status: 'Inativo', contractedLicenses: 2, pricePerLicense: 299.99, effectiveDate: new Date('2024-04-23'), nextBillingDate: new Date('2024-04-23'), clientId: 2 },
            { id: 3, createdAt: new Date('2024-04-22'), plan: PlansService.getAllPlansData()[2], additionalPrice: 399.99, planPrice: 399.99, status: 'Ativo', contractedLicenses: 3, pricePerLicense: 399.99, effectiveDate: new Date('2024-04-22'), nextBillingDate: new Date('2024-04-22'), clientId: 3 },
            { id: 4, createdAt: new Date('2024-04-21'), plan: PlansService.getAllPlansData()[3], additionalPrice: 499.99, planPrice: 499.99, status: 'Inativo', contractedLicenses: 4, pricePerLicense: 499.99, effectiveDate: new Date('2024-04-21'), nextBillingDate: new Date('2024-04-21'), clientId: 4 },
            { id: 5, createdAt: new Date('2024-04-20'), plan: PlansService.getAllPlansData()[4], additionalPrice: 599.99, planPrice: 599.99, status: 'Ativo', contractedLicenses: 5, pricePerLicense: 599.99, effectiveDate: new Date('2024-04-20'), nextBillingDate: new Date('2024-04-20'), clientId: 5 },
            { id: 6, createdAt: new Date('2024-04-19'), plan: PlansService.getAllPlansData()[5], additionalPrice: 699.99, planPrice: 699.99, status: 'Inativo', contractedLicenses: 6, pricePerLicense: 699.99, effectiveDate: new Date('2024-04-19'), nextBillingDate: new Date('2024-04-19'), clientId: 6 }
        ]
    },

    getAllApplication(): Promise<Application[]> {
        return Promise.resolve(this.getAllApplicationData())
    },

    defaultFields(): ApplicationFields {
        return {
            plan: PlansService.defaultFields() as PlansFields,
            planPrice: null,
            additionalPrice: null,

            status: 'Ativo',

            contractedLicenses: null,
            pricePerLicense: null,
        
            effectiveDate: new Date(),
            nextBillingDate: new Date(),

            clientId: null
        }
    }
}