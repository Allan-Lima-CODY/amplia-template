export interface User { 
    id: Number,
    name: string,
    createdAt: string, 
    status: string,
    email: string,
    password: string,

    temporaryPassword: boolean, 

    includeClients: boolean, 
    editClients: boolean, 
    deleteClients: boolean, 

    includeUsers: boolean, 
    editUsers: boolean, 
    deleteUsers: boolean, 

    includeLicenses: boolean, 
    editLicenses: boolean, 
    deleteLicenses: boolean, 

    includeFunctionalities: boolean, 
    editFunctionalities: boolean, 
    deleteFunctionalities: boolean, 

    includePlans: boolean, 
    editPlans: boolean, 
    deletePlans: boolean, 

    includeLogs: boolean, 
    editLogs: boolean, 
    deleteLogs: boolean, 

    confidentialInformation: boolean
}

export interface UsersFields {
    name: string,
    email: string,
    password: string,

    status: boolean,

    temporaryPassword: boolean,

    includeClients: boolean,
    editClients: boolean,
    deleteClients: boolean,

    includeUsers: boolean,
    editUsers: boolean,
    deleteUsers: boolean,

    includeLicenses: boolean,
    editLicenses: boolean,
    deleteLicenses: boolean,

    includeFunctionalities: boolean,
    editFunctionalities: boolean,
    deleteFunctionalities: boolean,

    includePlans: boolean,
    editPlans: boolean,
    deletePlans: boolean,

    includeLogs: boolean,
    editLogs: boolean,
    deleteLogs: boolean,

    confidentialInformation: boolean
}