import type { Action } from "@/models/Action"
export const ActionsService = {
    getActions(): Action[]{
        return [
            {
                id:1,
                name: 'Cadastro'
            },
            {
                id:2,
                name: 'Edição'
            },
            {
                id:1,
                name: 'Excluir'
            },
        ]
    }
}