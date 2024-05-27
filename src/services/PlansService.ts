import type { Plans, PlansFeature, PlansFields } from '../models/Plans'
import { FeatureService } from './FeaturesService'
export const PlansService =
{
    getAllPlansData(): Plans[] {
        return [
            { id: 1, name: 'Iniciante WMS', createdAt: new Date('2024-04-24'), product: 'WMS', price: 199.99 },
            { id: 2, name: 'Intermediário WMS', createdAt: new Date('2024-04-23'), product: 'WMS', price: 299.99 },
            { id: 3, name: 'Pro WMS', createdAt: new Date('2024-04-22'), product: 'WMS', price: 399.99 },
            { id: 4, name: 'Iniciante CRM', createdAt: new Date('2024-04-21'), product: 'CRM', price: 499.99 },
            { id: 5, name: 'Intermediário CRM', createdAt: new Date('2024-04-20'), product: 'CRM', price: 599.99 },
            { id: 6, name: 'Pro CRM', createdAt: new Date('2024-04-19'), product: 'CRM', price: 699.99 }
        ]
    },

    getAllPlansFeatureData(): PlansFeature[] {
        return [
            { id: 1, idPlans: 1, idFeatures: 1 },
            { id: 2, idPlans: 1, idFeatures: 2 },
            { id: 3, idPlans: 1, idFeatures: 3 },
            { id: 4, idPlans: 2, idFeatures: 4 },
            { id: 5, idPlans: 2, idFeatures: 5 },
            { id: 6, idPlans: 3, idFeatures: 1 },
            { id: 7, idPlans: 3, idFeatures: 2 },
            { id: 8, idPlans: 3, idFeatures: 3 },
            { id: 9, idPlans: 4, idFeatures: 6 },
            { id: 10, idPlans: 4, idFeatures: 7 },
            { id: 11, idPlans: 5, idFeatures: 8 },
            { id: 12, idPlans: 5, idFeatures: 9 },
            { id: 13, idPlans: 6, idFeatures: 10 },
            { id: 14, idPlans: 6, idFeatures: 6 }
        ]
    },

    getAllPlans(): Promise<Plans[]> {
        return Promise.resolve(this.getAllPlansData())
    },

    getPlanByName(name : string): Promise<Plans | undefined> {
        return Promise.resolve(this.getAllPlansData().find(plan => plan.name === name))
    },

    getAllPlansFeature(): Promise<PlansFeature[]> {
        return Promise.resolve(this.getAllPlansFeatureData())
    },

    defaultFields(): PlansFields {
        return {
            name: '',

            price: null,
            product: ''
        }
    }
}