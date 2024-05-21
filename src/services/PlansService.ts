import type { Plans, PlansFields } from '../models/Plans'
import { FeatureService } from './FeaturesService'
export const PlansService =
{
    getAllPlansData(): Plans[] {
        return [
            { id: 1, name: 'Iniciante WMS', createdAt: new Date('2024-04-24'), product: 'WMS', price: 199.99, features: [FeatureService.getAllFeaturesData()[0], FeatureService.getAllFeaturesData()[2], FeatureService.getAllFeaturesData()[4]] },
            { id: 2, name: 'Intermediário WMS', createdAt: new Date('2024-04-23'), product: 'WMS', price: 299.99, features: [FeatureService.getAllFeaturesData()[5], FeatureService.getAllFeaturesData()[7], FeatureService.getAllFeaturesData()[9]] },
            { id: 3, name: 'Pro WMS', createdAt: new Date('2024-04-22'), product: 'WMS', price: 399.99, features: [FeatureService.getAllFeaturesData()[1], FeatureService.getAllFeaturesData()[3], FeatureService.getAllFeaturesData()[4]] },
            { id: 4, name: 'Iniciante CRM', createdAt: new Date('2024-04-21'), product: 'CRM', price: 499.99, features: [FeatureService.getAllFeaturesData()[6], FeatureService.getAllFeaturesData()[8], FeatureService.getAllFeaturesData()[9]] },
            { id: 5, name: 'Intermediário CRM', createdAt: new Date('2024-04-20'), product: 'CRM', price: 599.99, features: [FeatureService.getAllFeaturesData()[0], FeatureService.getAllFeaturesData()[2], FeatureService.getAllFeaturesData()[4]] },
            { id: 6, name: 'Pro CRM', createdAt: new Date('2024-04-19'), product: 'CRM', price: 699.99, features: [FeatureService.getAllFeaturesData()[0], FeatureService.getAllFeaturesData()[2], FeatureService.getAllFeaturesData()[4]] }
        ]
    },

    getAllPlans(): Promise<Plans[]> {
        return Promise.resolve(this.getAllPlansData())
    },

    defaultFields(): PlansFields {
        return {
            name: '',

            price: null,
            product: '',
        
            features: []
        }
    }
}