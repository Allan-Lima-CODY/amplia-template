import type { Feature } from '../models/Feature'
export const FeatureService = 
{
    getAllFeaturesData(): Feature[] 
    {
        return [
            {
                id: 1,
                createdAt: new Date('2023-12-20'),
                name: 'Separação 1',
                product: 'WMS'
            },
            {
                id: 2,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 2',
                product: 'WMS'
            },
            { 
                id: 3,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 3',
                product: 'WMS'
            },
            { 
                id: 4,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 4',
                product: 'WMS'
            },
            { 
                id: 5,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 5',
                product: 'WMS'
            },
            { 
                id: 6,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 6',
                product: 'CRM'
            },
            { 
                id: 7,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 7',
                product: 'CRM'
            },
            { 
                id: 8,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 8',
                product: 'CRM'
            },
            { 
                id: 9,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 9',
                product: 'CRM'
            },
            { 
                id: 10,
                createdAt: new Date('2024-01-20'),
                name: 'Separação 10',
                product: 'CRM'
            },
        ]
    },

    getAllFeatures(): Promise<Feature[]> {
        return Promise.resolve(this.getAllFeaturesData())
    }
}