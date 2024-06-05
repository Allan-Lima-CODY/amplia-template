import type { Login, User, UsersFields } from '../models/User'
import { GenericFunctions } from './GenericFunctions'
export const UserService =
{
    getAllUsersData(): User[] {
        return [
            { id: 1, name: 'Allan Lima', createdAt: new Date('2024-04-24'), status: 'Ativo', email: 'allan.santos@smart01.com.br', password: '1', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 2, name: 'Luana Mandzirosche', createdAt: new Date('2024-04-23'), status: 'Ativo', email: 'luana@smart01.com.br', password: '12', temporaryPassword: true, viewCustomer: true, includeCustomer: false, editCustomer: true, deleteCustomer: false, includeApplication: false, editApplication: true, deleteApplication: false, viewUser: true, includeUser: false, editUser: true, deleteUser: false, viewFeature: true, includeFeature: false, editFeature: false, deleteFeature: false, viewPlan: true, includePlan: false, editPlan: false, deletePlan: false, viewLog: false, confidentialInformation: false },
            { id: 3, name: 'Arthur Brites', createdAt: new Date('2024-04-22'), status: 'Inativo', email: 'arthur@smart01.com.br', password: '123', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 4, name: 'Giuliano Costa', createdAt: new Date('2024-04-21'), status: 'Inativo', email: 'giuliano@smart01.com.br', password: '1234', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 5, name: 'Andrey', createdAt: new Date('2024-04-20'), status: 'Ativo', email: 'Andrey@smart01.com.br', password: '12345', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 6, name: 'Alvanir', createdAt: new Date('2024-04-19'), status: 'Ativo', email: 'Alvanir@smart01.com.br', password: '123456', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 7, name: 'Lislaine', createdAt: new Date('2024-04-18'), status: 'Inativo', email: 'Lislaine@smart01.com.br', password: '1234567', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 8, name: 'Matheus', createdAt: new Date('2024-04-17'), status: 'Inativo', email: 'Matheus@smart01.com.br', password: '12345678', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 9, name: 'Luiz', createdAt: new Date('2024-04-16'), status: 'Ativo', email: 'Luiz@smart01.com.br', password: '123456789', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 10, name: 'Miguel', createdAt: new Date('2024-04-15'), status: 'Ativo', email: 'Miguel@smart01.com.br', password: '10', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: false, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 11, name: 'testeGeneral', createdAt: new Date('2024-04-14'), status: 'Ativo', email: 'teste@smart01.com.br', password: '123456', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: true, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, deleteUser: true, viewFeature: true, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
        ]
    },

    getAllUsers(): Promise<User[]> {
        return Promise.resolve(this.getAllUsersData())
    },
    
    defaultFields(): UsersFields {
        return {
            name: '',
            email: '',
            password: '',

            status: true,

            temporaryPassword: false,

            viewCustomer: false,
            includeCustomer: false,
            editCustomer: false,
            deleteCustomer: false,

            includeApplication: false, 
            editApplication: false, 
            deleteApplication: false, 

            viewUser: false,
            includeUser: false,
            editUser: false,
            deleteUser: false,

            viewFeature: false,
            includeFeature: false,
            editFeature: false,
            deleteFeature: false,

            viewPlan: false,
            includePlan: false,
            editPlan: false,
            deletePlan: false,

            viewLog: false,

            confidentialInformation: false
        }
    },

    LoginDefaultFields(): Login {
        return {
            email: '',
            password: ''
        }
    },

    isAuthenticated(): boolean {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            const userObj = JSON.parse(user);
            const currentTime = new Date().getTime();
            if (currentTime > userObj.expiryTime) {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('dataUser');
                return false;
            }
            return true;
        }
        return false;
    },

    getUserPermissions() {
        const dataUser = localStorage.getItem('dataUser');
        if (dataUser) {
            try {
                const { encryptedPermissions } = JSON.parse(dataUser);
                const decryptedPermissions = GenericFunctions.decryptObject(encryptedPermissions);
                return decryptedPermissions;
            } catch (e) {
                console.error('Error parsing or decrypting dataUser from localStorage', e);
                return null;
            }
        }
        return null;
    }
}