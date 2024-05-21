import type { Feature } from '../models/Feature'
export const FeatureService = 
{
    getAllFeaturesData(): Feature[] 
    {
        return [
            {
                id: 1,
                createdAt: new Date('2023-12-20'),
                name: 'Separação',
                product: 'WMS'
            },
            {
                id: 2,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'WMS'
            },
            { 
                id: 3,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'WMS'
            },
            { 
                id: 4,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'WMS'
            },
            { 
                id: 5,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'WMS'
            },
            { 
                id: 6,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'CRM'
            },
            { 
                id: 7,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'CRM'
            },
            { 
                id: 8,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'CRM'
            },
            { 
                id: 9,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'CRM'
            },
            { 
                id: 10,
                createdAt: new Date('2024-01-20'),
                name: 'Expedição',
                product: 'CRM'
            },
        ]
    },

    getAllFeatures(): Promise<Feature[]> {
        return Promise.resolve(this.getAllFeaturesData())
    }
}