<script setup>
import { ref, onMounted } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/api";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();
const loading = ref(false);
const notyf = new Notyf();

const profile = ref({
	firstName: "",
	lastName: "",
	mobileNo: "",
});

// Prefill user info on mount
onMounted(() => {
	if (global.user) {
		profile.value.firstName = global.user.firstName || "";
		profile.value.lastName = global.user.lastName || "";
		profile.value.mobileNo = global.user.mobileNo || "";
	}
});

const updateProfile = async () => {
	try {
		loading.value = true;

		await api.put("/users/profile",{
				firstName: profile.value.firstName,
				lastName: profile.value.lastName,
				mobileNo: profile.value.mobileNo,
			}
		);

		notyf.success("Profile updated successfully");
	} catch (err) {
		const msg = err.response?.data?.message || "Update failed";
		notyf.error(msg);
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="container mt-5">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="card shadow-sm">
					<div class="card-body">
						<h3 class="card-title mb-4">Update Profile</h3>
						<form @submit.prevent="updateProfile">
							<div class="mb-3">
								<label class="form-label">First Name</label>
								<input
									type="text"
									v-model="profile.firstName"
									class="form-control"
									required
								/>
							</div>
							<div class="mb-3">
								<label class="form-label">Last Name</label>
								<input
									type="text"
									v-model="profile.lastName"
									class="form-control"
									required
								/>
							</div>
							<div class="mb-3">
								<label class="form-label">Mobile Number</label>
								<input
									type="tel"
                  pattern="[0-9]{11}"
                  title="Enter a valid 11-digit mobile number"
									v-model="profile.mobileNo"
									class="form-control"
									required
								/>
							</div>
							<button
								type="submit"
								class="btn btn-primary w-100"
								:disabled="loading"
							>
								{{ loading ? "Updating..." : "Update Profile" }}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
