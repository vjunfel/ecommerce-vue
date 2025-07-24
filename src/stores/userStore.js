import { defineStore } from "pinia";
import api from "../api";

const savedToken = localStorage.getItem("token");

export const useUserStore = defineStore("user", {
	state: () => ({
		token: savedToken || null,
		email: null,
		isAdmin: false,
		isLoading: false,
	}),

	actions: {
		async loginUser({ email, password }) {
			try {
				const res = await api.post("/users/login", {  email, password });

				if (res.status !== 200) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Login failed");
				}

				localStorage.setItem("token", res.access);
				
			} catch (error) {
				console.error("Login failed:", error);
				throw error;
			}
		},

		async fetchUserDetails() {
			if (!this.token || this.token === "null") return;

			this.isLoading = true;
			try {
				const res = await api.get("/users/details");
				console.log("RES DATA:", res);

				this.email = res.data.email;
				this.isAdmin = res.data.isAdmin;
			} catch (error) {
				console.error("User details fetch failed:", error);
				this.clearUser();
			} finally {
				this.isLoading = false;
			}
		},

		setToken(token) {
			this.token = token;
			localStorage.setItem("token", token);
		},

		clearUser() {
			this.token = null;
			this.email = null;
			this.isAdmin = false;
			localStorage.removeItem("token");
		},
	},
});
