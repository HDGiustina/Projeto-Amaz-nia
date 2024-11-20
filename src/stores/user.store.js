import { defineStore } from "pinia";
import router from '@/router'; 

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        user: false,
    }),
    getters: {
        getUser: (state) => state.user,
    },
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem('session', JSON.stringify(user));
        },
        async logout() {
            this.user = false;
            localStorage.removeItem('token');
            localStorage.removeItem('session');
            // util.setNotification('info', 'Sessão finalizada');
            router.push('/');
        },
        async getUserData() {
            if (this.user) {
                return this.user
            } else {
                return JSON.parse(localStorage.getItem('session'));
            }
        },
    },
});