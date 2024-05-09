import type { Customer } from "@/models/Customer"
export const CustomerService = {
    getAllCustomerData() : Customer[]{
        return [
            {
                id:1,
                name: 'Granado'
            },
            {
                id:2,
                name: 'Filtran'
            }
        ]
    },
    getAllCustomers() : Promise<Customer[]>{
        return Promise.resolve(this.getAllCustomerData());
    }
}