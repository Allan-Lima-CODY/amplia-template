import type { Plans } from '@/models/Plans'
import type { Application, ApplicationFields } from '../models/Application'
import { PlansService } from './PlansService'
export const ApplicationService =
{
    getAllApplicationData(): Application[] {
        return [
            { id: 1, createdAt: new Date('2024-04-24'), plan: PlansService.getAllPlansData()[0], additionalPrice: 199.99, planPrice: 199.99, status: 'Ativo', contractedLicenses: 1, pricePerLicense: 199.99, effectiveDate: new Date('2024-04-24'), nextBillingDate: new Date('2024-04-24'), totalPrice: 0 },
            { id: 2, createdAt: new Date('2024-04-23'), plan: PlansService.getAllPlansData()[1], additionalPrice: 299.99, planPrice: 299.99, status: 'Inativo', contractedLicenses: 2, pricePerLicense: 299.99, effectiveDate: new Date('2024-04-23'), nextBillingDate: new Date('2024-04-23'), totalPrice: 0 },
            { id: 3, createdAt: new Date('2024-04-22'), plan: PlansService.getAllPlansData()[2], additionalPrice: 399.99, planPrice: 399.99, status: 'Ativo', contractedLicenses: 3, pricePerLicense: 399.99, effectiveDate: new Date('2024-04-22'), nextBillingDate: new Date('2024-04-22'), totalPrice: 0 },
            { id: 4, createdAt: new Date('2024-04-21'), plan: PlansService.getAllPlansData()[3], additionalPrice: 499.99, planPrice: 499.99, status: 'Inativo', contractedLicenses: 4, pricePerLicense: 499.99, effectiveDate: new Date('2024-04-21'), nextBillingDate: new Date('2024-04-21'), totalPrice: 0 },
            { id: 5, createdAt: new Date('2024-04-20'), plan: PlansService.getAllPlansData()[4], additionalPrice: 599.99, planPrice: 599.99, status: 'Ativo', contractedLicenses: 5, pricePerLicense: 599.99, effectiveDate: new Date('2024-04-20'), nextBillingDate: new Date('2024-04-20'), totalPrice: 0 },
            { id: 6, createdAt: new Date('2024-04-19'), plan: PlansService.getAllPlansData()[5], additionalPrice: 699.99, planPrice: 699.99, status: 'Inativo', contractedLicenses: 6, pricePerLicense: 699.99, effectiveDate: new Date('2024-04-19'), nextBillingDate: new Date('2024-04-19'), totalPrice: 0 }
        ]
    },

    getAllApplication(): Promise<Application[]> {
        return Promise.resolve(this.getAllApplicationData())
    },

    defaultFields(): ApplicationFields {
        return {
            id: null,

            product: '',
            plan: '',
            planPrice: null,
            additionalPrice: null,

            status: true,

            contractedLicenses: 0,
            pricePerLicense: 0,
        
            effectiveDate: null,
            nextBillingDate: null,

            totalPrice: 0
        }
    },

    async toApp(fields : ApplicationFields): Promise<Application> {
            const plan = await PlansService.getPlanByName(fields.plan as string);
            return{
                id: fields.id as number,
                createdAt: new Date(),
                plan: plan as Plans,
                additionalPrice: fields.additionalPrice as number,
                planPrice: fields.planPrice as number,
                status: fields.status ? "Ativo" : "Inativo",
                contractedLicenses: fields.contractedLicenses as number,
                pricePerLicense: fields.pricePerLicense as number,
                effectiveDate: fields.effectiveDate as Date,
                nextBillingDate: fields.nextBillingDate as Date,
                totalPrice: 0
            }
    },

    async toFields(app : Application) : Promise<ApplicationFields>{
        const plan = await PlansService.getPlanByName(app.plan.name);
        return{
            id: app.id,
            product: plan?.product,
            plan: app.plan.name,
            additionalPrice: app.additionalPrice,
            planPrice: app.planPrice,
            status: app.status === "Ativo",
            contractedLicenses: app.contractedLicenses,
            pricePerLicense: app.pricePerLicense,
            effectiveDate: app.effectiveDate,
            nextBillingDate: app.nextBillingDate,
            totalPrice: app.totalPrice
        }
    }
}