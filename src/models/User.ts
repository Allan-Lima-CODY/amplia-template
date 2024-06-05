export interface User { 
    id: Number,
    name: string,
    createdAt: Date, 
    status: string,
    email: string,
    password: string,

    temporaryPassword: boolean, 

    viewCustomer: boolean,
    includeCustomer: boolean, 
    editCustomer: boolean, 
    deleteCustomer: boolean, 

    includeApplication: boolean, 
    editApplication: boolean, 
    deleteApplication: boolean, 

    viewUser: boolean,
    includeUser: boolean, 
    editUser: boolean, 
    deleteUser: boolean, 

    viewFeature: boolean,
    includeFeature: boolean, 
    editFeature: boolean, 
    deleteFeature: boolean, 

    viewPlan: boolean,
    includePlan: boolean, 
    editPlan: boolean, 
    deletePlan: boolean, 

    viewLog: boolean,

    confidentialInformation: boolean
}

export interface UsersFields {
    name: string,
    email: string,
    password: string,

    status: boolean,

    temporaryPassword: boolean,

    viewCustomer: boolean,
    includeCustomer: boolean, 
    editCustomer: boolean, 
    deleteCustomer: boolean, 

    includeApplication: boolean, 
    editApplication: boolean, 
    deleteApplication: boolean, 

    viewUser: boolean,
    includeUser: boolean, 
    editUser: boolean, 
    deleteUser: boolean, 

    viewFeature: boolean,
    includeFeature: boolean, 
    editFeature: boolean, 
    deleteFeature: boolean, 

    viewPlan: boolean,
    includePlan: boolean, 
    editPlan: boolean, 
    deletePlan: boolean, 

    viewLog: boolean,

    confidentialInformation: boolean
}

export interface Login {
    email: string,
    password: string
}