import privateApi from "@/api/privateApi";
import publicApi from "@/api/pubApi";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const email = ref(null);
  const isAdmin = ref(false);
  const id = ref(null);
  const firstName = ref(null);
  const lastName = ref(null);
  const mobileNo = ref(null);
  const isLoading = ref(false);

  const isLoggedIn = computed(() => !!token.value && token.value !== "null");
  
  async function loginUser({ email: userEmail, password }) {
    isLoading.value = true;
    try {
      const response = await publicApi.post("/users/login", {
        email: userEmail,
        password
      });
      
      console.log("RESPONSE:", response);
      
      if (response.status !== 200) {
        throw new Error("Login Failed")
      }
      
      token.value = response.data.access;
      
      if (token.value && token.value !== "null") {
        await fetchUserDetails();
        console.log("Token before setting:", token.value);
      }
      
      return response.data; // useful if you want to access it in the component
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUserDetails() {
    if (!token.value || token.value === "null") return;

    isLoading.value = true;
    try {
      const res = await privateApi.get("/users/details"); // use privateApi if token is needed
      const user = res.data.user;
      
      console.log("USER", user);

      email.value = user.email;
      isAdmin.value = user.isAdmin;
      id.value = user._id;
      firstName.value = user.firstName;
      lastName.value = user.lastName;
      mobileNo.value = user.mobileNo;
    } catch (error) {
      console.error("User details fetch failed:", error);
      clearUser();
    } finally {
      isLoading.value = false;
    }
  }

  function setToken(newToken) {
    token.value = newToken;
  }

  function clearUser() {
    token.value = null;
    email.value = null;
    isAdmin.value = false;
    id.value = null;
    firstName.value = null;
    lastName.value = null;
    mobileNo.value = null;
  }

  function updateProfileLocally(updatedUser) {
    firstName.value = updatedUser.firstName ?? firstName.value;
    lastName.value = updatedUser.lastName ?? lastName.value;
    mobileNo.value = updatedUser.mobileNo ?? mobileNo.value;
    email.value = updatedUser.email ?? email.value;
    id.value = updatedUser._id ?? id.value;
    isAdmin.value = updatedUser.isAdmin ?? isAdmin.value;
  }
  
  function logout() {
    clearUser();
    token.value = null;
  }

  return {
    token,
    email,
    isAdmin,
    id,
    firstName,
    lastName,
    mobileNo,
    isLoading,
    isLoggedIn,
    loginUser,
    fetchUserDetails,
    setToken,
    clearUser,
    updateProfileLocally
  };
}, {
  // persist: true
  persist: {
    paths: ['token'] // only persist the token
  }
});
