import type { Plans, PlansFields } from '../models/Plans'
export const PlansService =
{
    getAllPlansData(): Plans[] {
        return [
            { id: 1, name: 'Iniciante WMS', createdAt: new Date('2024-04-24'), product: 'WMS', price: 199.99,  pickingList: true, waveSeparation: true, separationRoute: true, orderConference: true, volumeControl: false, labelPrinting: true, labelReprint: true },
            { id: 2, name: 'Intermediário WMS', createdAt: new Date('2024-04-23'), product: 'WMS', price: 299.99,  pickingList: true, waveSeparation: true, separationRoute: true, orderConference: true, volumeControl: false, labelPrinting: true, labelReprint: true },
            { id: 3, name: 'Pro WMS', createdAt: new Date('2024-04-22'), product: 'WMS', price: 399.99,  pickingList: true, waveSeparation: true, separationRoute: true, orderConference: true, volumeControl: false, labelPrinting: true, labelReprint: true },
            { id: 4, name: 'Iniciante CRM', createdAt: new Date('2024-04-21'), product: 'CRM', price: 499.99,  pickingList: true, waveSeparation: true, separationRoute: true, orderConference: true, volumeControl: false, labelPrinting: true, labelReprint: true },
            { id: 5, name: 'Intermediário CRM', createdAt: new Date('2024-04-20'), product: 'CRM', price: 599.99, pickingList: true, waveSeparation: true, separationRoute: true, orderConference: true, volumeControl: false, labelPrinting: true, labelReprint: true },
            { id: 6, name: 'Pro CRM', createdAt: new Date('2024-04-19'), product: 'CRM', price: 699.99,  pickingList: true, waveSeparation: true, separationRoute: true, orderConference: true, volumeControl: false, labelPrinting: true, labelReprint: true }
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
        
            pickingList: false,
            waveSeparation: false,
            separationRoute: false,
            orderConference: false,
            volumeControl: false,
            labelPrinting: false,
            labelReprint: false
        }
    }
}