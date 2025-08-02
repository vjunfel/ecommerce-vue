	<script setup>
	import { ref, onMounted } from "vue";
	import { Notyf } from "notyf";
	import "notyf/notyf.min.css";
	import api from "@/api/privateApi";
	import { useUserStore } from "@/stores/userStore";

	const user = useUserStore();
	const loading = ref(false);
	const notyf = new Notyf();

	const profile = ref({
	  firstName: "",
	  lastName: "",
	  mobileNo: "",
	});

	onMounted(() => {
	  profile.value.firstName = user.firstName || "";
	  profile.value.lastName = user.lastName || "";
	  profile.value.mobileNo = user.mobileNo || "";
	});

	const updateProfile = async () => {
	  try {
	    loading.value = true;
	    const token = user.token || localStorage.getItem("token");

	    if (!token) {
	      notyf.error("You are not authorized");
	      loading.value = false;
	      return;
	    }

	    const res = await api.patch(
	      "/users/update-profile",
	      { ...profile.value },
	      {
	        headers: {
	          Authorization: `Bearer ${token}`,
	        },
	      }
	    );
			console.log("UPDATE PROFILE", res);

	    user.updateProfileLocally(res.data.user);
	    notyf.success("Profile updated successfully");
	  } catch (err) {
	    const msg = err.response?.data?.message || "Update failed";
	    notyf.error(msg);
	    console.error("Update failed:", err.response?.data || err.message);
	  } finally {
	    loading.value = false;
	  }
	};
	</script>

	<template>
	  <section class="container">
	    <div class="row justify-content-center my-5">
	      <div class="col-md-6">
	        <div class="card shadow-sm p-5">
	          <div class="card-body">
	            <h3 class="mb-5 text-warning  text-center">Update Profile</h3>
	            <form @submit.prevent="updateProfile">
	              <div class="mb-3">
	                <label class="form-label">First Name</label>
	                <input
	                  type="text"
	                  v-model="profile.firstName"
	                  class="form-control border-dark"
	                  required
	                  placeholder="Enter your first name"
	                />
	              </div>
	              <div class="mb-3">
	                <label class="form-label">Last Name</label>
	                <input
	                  type="text"
	                  v-model="profile.lastName"
	                  class="form-control border-dark"
	                  required
	                  placeholder="Enter your last name"
	                />
	              </div>
	              <div class="mb-3">
	                <label class="form-label">Mobile Number</label>
	                <input
	                  type="tel"
	                  v-model="profile.mobileNo"
	                  class="form-control border-dark"
	                  required
	                  pattern="[0-9]{11}"
	                  title="Enter a valid 11-digit mobile number"
	                  placeholder="09XXXXXXXXX"
	                />
	              </div>
	              <button type="submit" class="btn btn-warning my-4 w-100" :disabled="loading">
	                {{ loading ? "Updating..." : "Update Profile" }}
	              </button>
	            </form>
	          </div>
	        </div>
	      </div>
	    </div>
	  </section>
	</template>
