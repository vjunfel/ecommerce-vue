import { defineStore } from "pinia";
import api from "../api";

const savedToken = localStorage.getItem("token");

export const useUserStore = defineStore("user", {
  state: () => ({
    token: savedToken || null,
    email: null,
    isAdmin: false,
    id: null,
    firstName: null,
    lastName: null,
    mobileNo: null,
    isLoading: false
  }),

  actions: {
    async loginUser({ email, password }) {
      try {
        const res = await api.post("/users/login", { email, password });

        if (res.status !== 200) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Login failed");
        }

        const token = res.data.access;
        this.token = token;
        localStorage.setItem("token", token);
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
        const user = res.data.user;

        this.email = user.email;
        this.isAdmin = user.isAdmin;
        this.id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.mobileNo = user.mobileNo;
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
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.mobileNo = null;
      localStorage.removeItem("token");
    },

    updateProfileLocally(updatedUser) {
      this.firstName = updatedUser.firstName ?? this.firstName;
      this.lastName = updatedUser.lastName ?? this.lastName;
      this.mobileNo = updatedUser.mobileNo ?? this.mobileNo;
      this.email = updatedUser.email ?? this.email;
      this.id = updatedUser._id ?? this.id;
      this.isAdmin = updatedUser.isAdmin ?? this.isAdmin;
    },

    setUser(userData) {
      Object.assign(this, userData);
    }
  }
});
