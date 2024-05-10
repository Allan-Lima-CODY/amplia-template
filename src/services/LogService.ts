import type { Log } from "@/models/Log"
export const LogService = {
    getAllLogsData(): Log[]{
        return [
            {
                id: 1,
                dateHour: new Date(),
                user: 'Allan Lima',
                customer: 'Granado',
                action: 'Edição',
                page: 'Clientes',
                info: 'Informação'
            },
            {
                id: 2,
                dateHour: new Date(),
                user: 'Arthur Brites',
                customer: 'Filtran',
                action: 'Cadastro',
                page: 'Planos',
                info: 'Cadastro novo plano "Platinum"'
            }
        ]
    },
    getAllLogs(): Promise<Log[]>{
        return Promise.resolve(this.getAllLogsData());
    }
}