// store/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, // Stocke les informations utilisateur
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        },
        clearUser() {
            this.user = null;
        },
    },
});
