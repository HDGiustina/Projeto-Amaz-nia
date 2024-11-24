import api from '@/api/index';
import { useUserStore } from '@/stores/user.store';
import router from '@/router';

const endpoints = {
    async fazerLogin(dados) {
        const userStore = useUserStore();

        return await api.post('/usuarios/login', { email: dados.email, senha: dados.senha })
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('session', JSON.stringify(response.data.data.user_data));
                    // util.setNotification('success', 'Login Efetuado com sucesso!');
                    userStore.setUser(response.data.data.user_data);
                    router.push({ name: 'Home' });
                    return true;
                }
            })
            .catch(() => {
                return false;
            });
    },

    async getEspecies(){
        return await api.get('/especies')
        .then((response) => {
            if (response.data) {
                return response.data.data
            }
        })
        .catch(() => {
            return false;
        });
    },


    async cadastrarEspecie(especie){
        return await api.post('/especies',especie)
        .then((response) => {
            if (response.data) {
                return response.data.data
            }
        })
        .catch(() => {
            return false;
        });
    },
    
    async excluirEspecie(id){
        return await api.delete('/especies/' + id)
        .then((response) => {
            if (response.data) {
                return response.data.data
            }
        })
        .catch(() => {
            return false;
        });
    },

    async getOneEspecie(id){
        return await api.get('/especies/' + id)
        .then((response) => {
            if (response.data) {
                return response.data.data
            }
        })
        .catch(() => {
            return false;
        });
    },

    async editOneEspecie(id, params){
        return await api.put('/especies/' + id, params)
        .then((response) => {
            if (response.data) {
                return response.data.data
            }
        })
        .catch(() => {
            return false;
        });
    },

    async getCaracteristica(id, url){
        return await api.get('/'+ url +'/especie/' + id)
        .then((response) => {
            if (response.data) {
                return response.data.data
            }
        })
        .catch(() => {
            return false;
        });
    },

    async cadastrarCaracteristica(url, dados, id = false,  edit = false){
        if(edit){
            return await api.put('/' + url + '/' + id, dados)
            .then((response) => {
                if (response.data.data) {
                    return response.data.data
                } else {
                    return false
                }
            })
            .catch(() => {
                return false;
            });
        } else {
            return await api.post('/' + url + '',dados)
            .then((response) => {
                if (response.data) {
                    return response.data.data
                }
            })
            .catch(() => {
                return false;
            });
        }
    },
}


export default endpoints;