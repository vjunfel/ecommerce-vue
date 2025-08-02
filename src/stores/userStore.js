import { defineStore } from "pinia";
import api from "@/api/privateApi";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    email: null,
    isAdmin: false,
    id: null,
    firstName: null,
    lastName: null,
    mobileNo: null,
    isLoading: false
  }),
  
  persist: true,

  actions: {
    async loginUser({ email, password }) {
      this.isLoading = true;
      try {
        const res = await axios.post("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/users/login", { 
          email, password 
        });

        if (res.status !== 200) {
          throw new Error(res.data.message || "Login failed");
        }

        this.token = res.data.access;
        await fetchUserDetails();
        
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        this.isLoading = false;
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
    },

    clearUser() {
      this.token = null;
      this.email = null;
      this.isAdmin = false;
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.mobileNo = null;
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
