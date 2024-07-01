export interface User { 
    id: Number
    name: string
    createdAt: Date
    status: string
    email: string
    password: string

    temporaryPassword: boolean

    viewCustomer: boolean
    includeCustomer: boolean
    editCustomer: boolean
    deleteCustomer: boolean

    includeApplication: boolean
    editApplication: boolean
    deleteApplication: boolean

    viewUser: boolean
    includeUser: boolean
    editUser: boolean

    viewFeature: boolean
    includeFeature: boolean
    editFeature: boolean
    deleteFeature: boolean

    viewPlan: boolean,
    includePlan: boolean
    editPlan: boolean
    deletePlan: boolean

    viewLog: boolean

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

export interface ViewUsers {
    id: string
    name: string
    createdAt: Date
    status: number | string
    email: string
}

export type PermissionKeys = 'viewCustomer' | 'includeCustomer' | 'editCustomer' | 'deleteCustomer' | 'includeApplication' | 'editApplication' | 'deleteApplication' | 'viewUser' | 'includeUser' | 'editUser' | 'viewFeature' | 'includeFeature' | 'editFeature' | 'deleteFeature' | 'viewPlan' | 'includePlan' | 'editPlan' | 'deletePlan' | 'viewLog' | 'confidentialInformation';

export const permissionMapping: Record<PermissionKeys, string> = {
    viewCustomer: 'D1EDFED3-F897-4D45-7000-08DC8C9E4782',
    includeCustomer: '7A3EF76C-28A0-4D27-7001-08DC8C9E4782',
    editCustomer: 'EAA503BB-6DD6-4A31-7002-08DC8C9E4782',
    deleteCustomer: 'D275558D-6219-47D9-7003-08DC8C9E4782',
    includeApplication: '87E268E5-1C2E-418F-7004-08DC8C9E4782',
    editApplication: 'B680501D-8C64-4DF5-7005-08DC8C9E4782',
    deleteApplication: 'D7EE86A1-EEEC-4137-7006-08DC8C9E4782',
    viewUser: 'DBF940E3-9BDF-4DC1-7007-08DC8C9E4782',
    includeUser: 'A6F1DB74-E2B5-4E7D-7008-08DC8C9E4782',
    editUser: '3BF17B65-5471-4264-7009-08DC8C9E4782',
    viewFeature: '0E05458F-AE86-4C5A-700B-08DC8C9E4782',
    includeFeature: '9AAE21F2-0CB6-4202-700C-08DC8C9E4782',
    editFeature: '2033B6FA-CD25-40B9-700D-08DC8C9E4782',
    deleteFeature: '41D432FC-C366-4D1A-700E-08DC8C9E4782',
    viewPlan: 'E4A50C2A-EC83-4C13-700F-08DC8C9E4782',
    includePlan: '6D6B4D95-27D6-4DA5-7010-08DC8C9E4782',
    editPlan: '6ADD3873-DE1C-4B08-7011-08DC8C9E4782',
    deletePlan: 'A9D20D20-14FA-49DD-7012-08DC8C9E4782',
    viewLog: '41960724-1DD8-459B-312B-08DC8EC8946B',
    confidentialInformation: 'FC631CA6-6C80-48B4-2CF1-08DC95326805'
};

export interface CreateUser {
    name: string
    email: string
    password: string,
    status: number,
    temporaryPassword: boolean,
    userPermission: {}
}

export interface UpdateUser {
    name: string
    email: string
    status: number
}

export interface UpdateUserPermission {
    permissionId: string
    allowed: Boolean
}