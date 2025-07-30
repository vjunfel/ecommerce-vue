<script setup>
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const goToUpdateProfile = () => {
  router.push("/update-profile");
};

const goToResetPassword = () => {
  router.push("/reset-password");
};

const viewOrders = () => {
  router.push("/orders")
}
</script>

<template>
  <div class="container-fluid text-warning" v-if="userStore.email">
    <!-- Header -->
    <h1 class="my-5 text-warning text-center">User Profile</h1>

    <!-- Profile Info Card -->
    <div class="row justify-content-center mb-5">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        
        <div class="card shadow-sm rounded-4 p-5 mb-5">
          <div class="card-body text-center p-0">
            <!-- Avatar -->
            <img
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(userStore.firstName + ' ' + userStore.lastName)}&background=FFC107&color=000&size=128`"
              alt="Avatar"
              class="rounded-circle shadow-sm mb-2"
              width="80"
              height="80"
            />

            <!-- Full Name & Role -->
            <h2 class="fw-bold m-3 text-dark">
              {{ userStore.firstName }} {{ userStore.lastName }}
            </h2>
            <span :class="userStore.isAdmin ? 'admin-badge text-dark' : 'text-dark customer-badge'">
              {{ userStore.isAdmin ? 'Admin' : 'Customer' }}
            </span>
          </div>
          
          <hr class="my-4" />

          <!-- Contact Info -->
          <div class="text-start">
            <!-- <h5 class="fw-semibold mb-3">Contact Information</h5> -->
            <ul class="list-unstyled m-0 d-flex flex-column flex-lg-row justify-content-evenly align-items-start gap-2">
              <li class="text-start d-flex align-items-center">
                <i class="bi bi-envelope-at me-2 fs-5"></i>
                <span class="text-nowrap">Email: <strong>{{ userStore.email }}</strong></span>
              </li>
              <li class="text-start d-flex align-items-center">
                <i class="bi bi-phone me-2 fs-5"></i>
                <span class="text-nowrap">Phone: <strong>{{ userStore.mobileNo || 'Not Provided' }}</strong></span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Buttons -->
        <div class="d-flex flex-column flex-md-row gap-3">
          <button
            class="profile-btn btn-orders w-100 py-2 px-3 fw-semibold shadow-sm d-flex justify-content-center align-items-center"
            @click="viewOrders"
          >
            <i class="bi bi-card-checklist me-3 fs-5"></i>
            <span class="d-sm-inline text-nowrap">View Orders</span>
          </button>
          <!-- <button
            class="profile-btn btn-update w-100 py-2 px-3 fw-semibold shadow-sm d-flex justify-content-center align-items-center"
            @click="goToUpdateProfile"
          >
            <i class="bi bi-pencil-square me-3 fs-5"></i>
            <span class="d-sm-inline text-nowrap">Update Profile</span>
          </button> -->

          <button
            class="profile-btn btn-reset w-100 py-2 px-3 fw-semibold shadow-sm d-flex justify-content-center align-items-center"
            @click="goToResetPassword"
          >
            <i class="bi bi-key me-3 fs-5"></i>
            <span class="d-sm-inline text-nowrap">Reset Password</span>
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-badge {
  background: #b9c2f8;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: smaller;
}
.admin-badge {
  background: #faf1c1;
  padding: 4px 10px;
  border-radius: 5px;
  font-size: smaller;
}

.badge {
  font-size: 0.9rem;
  padding: 0.5em 1em;
}

.card-body h2 {
  color: #ffc107;
}

.profile-btn {
  background-color: transparent;
  border: 1px solid gray;
  transition: all 0.15s ease-in-out;
  font-size: 1rem;
  min-height: 48px;
  border-radius: 0.5rem;
}

.btn-update {
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
  color: #050505;
}
.btn-reset {
  background-color: #181717;
  color: #ffffff;
}


.btn-orders:hover {
  background-color: #ffc107;
  border: 1px solid #ffc107;
}
.btn-update:hover {
  background-color: #04c464;
  border: 1px solid #04c464;
  color: #ffffff;
}
.btn-reset:hover {
  /* background-color: #dc3545;
  border: 1px solid #dc3545; */
  color: #ffffff;
  background-color: #ffc107;
  border: 1px solid #ffc107;
  color: #000000;
}

</style>
