import type { Login, User, UsersFields, ViewUsers, PermissionKeys, CreateUser, UpdateUserPermission, UpdateUser } from '../models/User'
import { permissionMapping } from '../models/User'
import { GenericFunctions } from './GenericFunctions'
import apiClient from '@/router/apiClient'
export const UserService =
{
    getAllUsersData(): User[] {
        return [
            { id: 1, name: 'Allan Lima', createdAt: new Date('2024-04-24'), status: 'Ativo', email: 'allan.santos@smart01.com.br', password: '1', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 2, name: 'Luana Mandzirosche', createdAt: new Date('2024-04-23'), status: 'Ativo', email: 'luana@smart01.com.br', password: '12', temporaryPassword: true, viewCustomer: true, includeCustomer: false, editCustomer: true, deleteCustomer: false, includeApplication: false, editApplication: true, deleteApplication: false, viewUser: true, includeUser: false, editUser: true, viewFeature: true, includeFeature: false, editFeature: false, deleteFeature: false, viewPlan: true, includePlan: false, editPlan: false, deletePlan: false, viewLog: false, confidentialInformation: false },
            { id: 3, name: 'Arthur Brites', createdAt: new Date('2024-04-22'), status: 'Inativo', email: 'arthur@smart01.com.br', password: '123', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 4, name: 'Giuliano Costa', createdAt: new Date('2024-04-21'), status: 'Inativo', email: 'giuliano@smart01.com.br', password: '1234', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 5, name: 'Andrey', createdAt: new Date('2024-04-20'), status: 'Ativo', email: 'Andrey@smart01.com.br', password: '12345', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 6, name: 'Alvanir', createdAt: new Date('2024-04-19'), status: 'Ativo', email: 'Alvanir@smart01.com.br', password: '123456', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 7, name: 'Lislaine', createdAt: new Date('2024-04-18'), status: 'Inativo', email: 'Lislaine@smart01.com.br', password: '1234567', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 8, name: 'Matheus', createdAt: new Date('2024-04-17'), status: 'Inativo', email: 'Matheus@smart01.com.br', password: '12345678', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 9, name: 'Luiz', createdAt: new Date('2024-04-16'), status: 'Ativo', email: 'Luiz@smart01.com.br', password: '123456789', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 10, name: 'Miguel', createdAt: new Date('2024-04-15'), status: 'Ativo', email: 'Miguel@smart01.com.br', password: '10', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: false, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: false, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
            { id: 11, name: 'testeGeneral', createdAt: new Date('2024-04-14'), status: 'Ativo', email: 'teste@teste.com.br', password: '123456', temporaryPassword: true, viewCustomer: true, includeCustomer: true, editCustomer: true, deleteCustomer: true, includeApplication: true, editApplication: true, deleteApplication: true, viewUser: true, includeUser: true, editUser: true, viewFeature: true, includeFeature: true, editFeature: true, deleteFeature: true, viewPlan: true, includePlan: true, editPlan: true, deletePlan: true, viewLog: true, confidentialInformation: true },
        ]
    },

    getAllUsers(): Promise<User[]> {
        return Promise.resolve(this.getAllUsersData())
    },

    async getAll(): Promise<ViewUsers[]> {
        try {
            const response = await apiClient.get('/user');
            const users = response.data.$values.map((user: any) => ({
                ...user,
                createdAt: new Date(user.createdAt),
                status: user.status === 1 ? 'Ativo' : 'Inativo'
            }));

            users.sort((a: ViewUsers, b: ViewUsers) => b.createdAt.getTime() - a.createdAt.getTime())

            return users;
        } catch (error) {
            console.error('Failed to fetch users', error);
            return [];
        }
    },

    async createUser(user: UsersFields): Promise<void> {
        const userPermissions = Object.keys(permissionMapping)
            .filter((key) => user[key as PermissionKeys])
            .map((key) => ({
                permissionId: permissionMapping[key as PermissionKeys],
                allowed: user[key as PermissionKeys]
            }));

        const userData: CreateUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            status: user.status ? 1 : 0,
            temporaryPassword: user.temporaryPassword,
            userPermission: userPermissions
        };

        console.log(userData);
        await apiClient.post('/user', userData);
    },

    async getById(userId: string): Promise<UsersFields> {
        const response = await apiClient.get(`/user/${userId}`);

        const user: UsersFields = {
            name: response.data.name,
            email: response.data.email,
            password: '',
            status: response.data.status === 1,
            temporaryPassword: false,

            // Mapeamento das permissões
            viewCustomer: this.getPermission(response.data.userPermission.$values, permissionMapping.viewCustomer.toLowerCase()),
            includeCustomer: this.getPermission(response.data.userPermission.$values, permissionMapping.includeCustomer.toLowerCase()),
            editCustomer: this.getPermission(response.data.userPermission.$values, permissionMapping.editCustomer.toLowerCase()),
            deleteCustomer: this.getPermission(response.data.userPermission.$values, permissionMapping.deleteCustomer.toLowerCase()),

            includeApplication: this.getPermission(response.data.userPermission.$values, permissionMapping.includeApplication.toLowerCase()),
            editApplication: this.getPermission(response.data.userPermission.$values, permissionMapping.editApplication.toLowerCase()),
            deleteApplication: this.getPermission(response.data.userPermission.$values, permissionMapping.deleteApplication.toLowerCase()),

            viewUser: this.getPermission(response.data.userPermission.$values, permissionMapping.viewUser.toLowerCase()),
            includeUser: this.getPermission(response.data.userPermission.$values, permissionMapping.includeUser.toLowerCase()),
            editUser: this.getPermission(response.data.userPermission.$values, permissionMapping.editUser.toLowerCase()),

            viewFeature: this.getPermission(response.data.userPermission.$values, permissionMapping.viewFeature.toLowerCase()),
            includeFeature: this.getPermission(response.data.userPermission.$values, permissionMapping.includeFeature.toLowerCase()),
            editFeature: this.getPermission(response.data.userPermission.$values, permissionMapping.editFeature.toLowerCase()),
            deleteFeature: this.getPermission(response.data.userPermission.$values, permissionMapping.deleteFeature.toLowerCase()),

            viewPlan: this.getPermission(response.data.userPermission.$values, permissionMapping.viewPlan.toLowerCase()),
            includePlan: this.getPermission(response.data.userPermission.$values, permissionMapping.includePlan.toLowerCase()),
            editPlan: this.getPermission(response.data.userPermission.$values, permissionMapping.editPlan.toLowerCase()),
            deletePlan: this.getPermission(response.data.userPermission.$values, permissionMapping.deletePlan.toLowerCase()),

            viewLog: this.getPermission(response.data.userPermission.$values, permissionMapping.viewLog.toLowerCase()),

            confidentialInformation: this.getPermission(response.data.userPermission.$values, permissionMapping.confidentialInformation.toLowerCase()),
        };

        return user;
    },

    getPermission(permissions: any[], permissionId: string): boolean {
        const permission = permissions.find(p => p.permissionId === permissionId);
        return permission ? permission.allowed : false;
    },

    checkUpdates(initialUser: UsersFields, currentUser: UsersFields): { userUpdate: boolean, permissionsUpdate: boolean, updatedPermissions: UpdateUserPermission[] } {
        let userUpdate = false;
        let permissionsUpdate = false;
        const updatedPermissions: UpdateUserPermission[] = [];
    
        if (initialUser.name !== currentUser.name || 
            initialUser.email !== currentUser.email || 
            initialUser.status !== currentUser.status) {
            userUpdate = true;
        }
    
        for (const key of Object.keys(permissionMapping) as PermissionKeys[]) {
            const initialPermission = initialUser[key];
            const currentPermission = currentUser[key];
            if (initialPermission !== currentPermission) {
                permissionsUpdate = true;
                updatedPermissions.push({
                    permissionId: permissionMapping[key],
                    allowed: currentPermission
                });
            }
        }

        console.log({ userUpdate, permissionsUpdate, updatedPermissions })
    
        return { userUpdate, permissionsUpdate, updatedPermissions };
    },

    async updateUser(user: UsersFields, initialUser: any, id: string): Promise<void> {
        const { userUpdate, permissionsUpdate, updatedPermissions } = this.checkUpdates(initialUser, user);
    
        if (userUpdate) {
            const userData: UpdateUser = {
                name: user.name,
                email: user.email,
                status: user.status ? 1 : 0
            };
            await apiClient.put(`/user/${id}`, userData);
        }
    
        if (permissionsUpdate) {
            console.log(updatedPermissions)
            await apiClient.put(`/userPermission/${id}`, updatedPermissions);
        }
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
