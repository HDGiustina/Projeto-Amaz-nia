import api from '@/api/index';
import { useUserStore } from '@/stores/user.store';
import router from '@/router';

const endpoints = {
    async fazerLogin(dados) {
        const userStore = useUserStore();

        return await api.post('/usuarios/login', { email: dados.email, senha: dados.senha })
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('token', response.data);
                    // localStorage.setItem('session', JSON.stringify(response.data.user));
                    // util.setNotification('success', 'Login Efetuado com sucesso!');
                    // userStore.setUser(response.data.user);
                    console.log("Login Efetuado com sucesso!")
                    router.push({ name: 'Home' });
                    return true;
                }
            })
            .catch(() => {
                return false;
            });
    },
}


export default endpoints;