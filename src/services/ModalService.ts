import type { ModalInfo } from '@/models/ModalInfo';
export const ModalService = 
{
    getFeatureModalInfo(modalType?: string) : ModalInfo
    {
        switch(modalType){
            case 'registered':
                return {
                title: 'Sucesso!',
                message : 'Funcionalidade registrada com sucesso!',
                borderColor : '#34D399',
                okTitle : 'Ok',
                noTitle : undefined
                };
            case 'warning':
            return {  
                title : 'Alerta',
                message : 'Deseja apagar essa funcionalidade?',
                borderColor : '#FFC800',
                okTitle : 'Sim',
                noTitle : 'Não',
            }
            case 'linkedPlanError':
            return {
                title : 'Erro',
                message : 'É necessário desvincular essa funcionalidade de um plano antes de apagá-la!',
                borderColor : '#F87171',
                okTitle : 'Ok',
                noTitle : undefined,
            }
            case 'emptyNameError':
            return {
                title : 'Erro',
                message : 'Preencha o nome da funcionalidade!',
                borderColor : '#F87171',
                okTitle : 'Ok',
                noTitle : undefined,
            }  
            case 'success':
                return {
                    title:'Sucesso!',
                    message : 'Funcionalidade apagada com sucesso!',
                    borderColor : '#34D399',
                    okTitle : 'Ok',
                    noTitle : undefined
                }
            default:
              return {
                title: '',
                message : '',
                borderColor : '#F87171',
                okTitle : '',
                noTitle : undefined
              }
          }
    },
    getRegisterModalInfo(modalType?: string) : ModalInfo{
        switch(modalType){
            case 'success':
                return{
                    title: 'Sucesso!',
                    message: 'Cadastro realizado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'error':
                return{
                    title: 'Erro',
                    message: 'É necessário que os campos estejam preenchidos!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            default:
                return{
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
        }
    },
    getPlansModalInfo(modalType?: string) : ModalInfo{
        switch(modalType){
            case 'registered':
                return {
                title: 'Sucesso!',
                message : 'Plano cadastrado com sucesso!',
                borderColor : '#34D399',
                okTitle : 'Ok',
                noTitle : undefined
                };
            case 'warning':
            return {  
                title : 'Alerta',
                message : 'Deseja apagar esse plano?',
                borderColor : '#FFC800',
                okTitle : 'Sim',
                noTitle : 'Não',
            }
            case 'success':
                return {
                    title:'Sucesso!',
                    message : 'Plano apagado com sucesso!',
                    borderColor : '#34D399',
                    okTitle : 'Ok',
                    noTitle : undefined
                }
            default:
              return {
                title: '',
                message : '',
                borderColor : '#F87171',
                okTitle : '',
                noTitle : undefined
              }
        }
    }
}