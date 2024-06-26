import type { ModalInfo } from '@/models/ModalInfo';
export const ModalService =
{
    getUserModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'registered':
                return {
                    title: 'Sucesso!',
                    message: 'Usuário cadastrado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
            case 'updated':
                return {
                    title: 'Sucesso!',
                    message: 'Usuário atualizado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
            case 'fluentValidationError':
                return {
                    title: 'Erro',
                    message: 'Verifique as pêndencias nos campos e corrija os erros!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined,
                }
            case 'emptyOrInvalidFieldsError':
                return {
                    title: 'Erro',
                    message: 'É necessário que os campos estejam preenchidos e sejam válidos!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined,
                }
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: '',
                    noTitle: undefined
                }
        }
    },
    getFeatureModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'registered':
                return {
                    title: 'Sucesso!',
                    message: 'Funcionalidade registrada com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'warning':
                return {
                    title: 'Alerta',
                    message: 'Deseja apagar essa funcionalidade?',
                    borderColor: '#FFC800',
                    okTitle: 'Sim',
                    noTitle: 'Não',
                }
            case 'linkedPlanError':
                return {
                    title: 'Erro',
                    message: 'É necessário desvincular essa funcionalidade de um plano antes de apagá-la!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined,
                }
            case 'emptyNameError':
                return {
                    title: 'Erro',
                    message: 'Preencha o nome da funcionalidade!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined,
                }
            case 'success':
                return {
                    title: 'Sucesso!',
                    message: 'Funcionalidade apagada com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: '',
                    noTitle: undefined
                }
        }
    },
    getRegisterModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'success':
                return {
                    title: 'Sucesso!',
                    message: 'Cadastro realizado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'updated':
                return {
                    title: 'Sucesso!',
                    message: 'Cadastro atualizado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'error':
                return {
                    title: 'Erro',
                    message: 'Um erro inesperado ocorreu e não foi possível gravar!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
        }
    },
    getPlansModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'registered':
                return {
                    title: 'Sucesso!',
                    message: 'Plano cadastrado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'warning':
                return {
                    title: 'Alerta',
                    message: 'Deseja apagar esse plano?',
                    borderColor: '#FFC800',
                    okTitle: 'Sim',
                    noTitle: 'Não',
                }
            case 'success':
                return {
                    title: 'Sucesso!',
                    message: 'Plano apagado com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: '',
                    noTitle: undefined
                }
        }
    },
    getLoginModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'loginError':
                return {
                    title: 'Erro',
                    message: 'Email ou senha invalidos!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'EmailNotFound':
                return {
                    title: 'Erro',
                    message: 'Email não encontrado!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
        }
    },
    getPassResetModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'success':
                return {
                    title: 'Sucesso!',
                    message: 'Senha alterada com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'mismatchPass':
                return {
                    title: 'Erro',
                    message: 'As senhas não correspondem!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'emptyfieldsError':
                return {
                    title: 'Erro',
                    message: 'É necessário preencher os campos!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
        }
    },
    getAppsModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'success':
                return {
                    title: 'Sucesso!',
                    message: 'Aplicação excluída com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'registered':
                return {
                    title: 'Sucesso!',
                    message: 'Aplicação registrada com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'updated':
                return {
                    title: 'Sucesso!',
                    message: 'Aplicação atualizada com sucesso!',
                    borderColor: '#34D399',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'fieldsError':
                return {
                    title: 'Erro',
                    message: 'É necessário preencher todos os campos obrigatórios!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'activeError':
                return {
                    title: 'Erro',
                    message: 'Não é possível excluir uma aplicação ativa!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            case 'warning':
                return {
                    title: 'Alerta',
                    message: 'Deseja excluir essa aplicação?',
                    borderColor: '#FFC800',
                    okTitle: 'Sim',
                    noTitle: 'Não'
                };
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
        }
    },
    getCepModal(modalType?: string): ModalInfo {
        switch (modalType) {
            case 'error':
                return {
                    title: 'Erro',
                    message: 'CEP não encontrado!',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                };
            default:
                return {
                    title: '',
                    message: '',
                    borderColor: '#F87171',
                    okTitle: 'Ok',
                    noTitle: undefined
                }
        }
    }
}