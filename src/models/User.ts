export interface User { 
    id: Number,
    name: string,
    createdAt: Date, 
    status: string,
    email: string,
    password: string,

    temporaryPassword: boolean, 

    includeClients: boolean, 
    editClients: boolean, 
    deleteClients: boolean, 

    includeApplication: boolean, 
    editApplication: boolean, 
    deleteApplication: boolean, 

    includeUsers: boolean, 
    editUsers: boolean, 
    deleteUsers: boolean, 

    includeLicenses: boolean, 
    editLicenses: boolean, 
    deleteLicenses: boolean, 

    includeFeatures: boolean, 
    editFeatures: boolean, 
    deleteFeatures: boolean, 

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

    includeApplication: boolean, 
    editApplication: boolean, 
    deleteApplication: boolean, 

    includeUsers: boolean,
    editUsers: boolean,
    deleteUsers: boolean,

    includeLicenses: boolean,
    editLicenses: boolean,
    deleteLicenses: boolean,

    includeFeatures: boolean,
    editFeatures: boolean,
    deleteFeatures: boolean,

    includePlans: boolean,
    editPlans: boolean,
    deletePlans: boolean,

    includeLogs: boolean,
    editLogs: boolean,
    deleteLogs: boolean,

    confidentialInformation: boolean
}

export interface Login {
    email: string,
    password: string
}