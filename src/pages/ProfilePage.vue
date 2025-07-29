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
    <div class="row justify-content-center mt-4">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <div class="card border-warning shadow-sm rounded-4">
          <div class="card-body text-center p-4">
            <!-- Avatar -->
            <img
              :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(userStore.firstName + ' ' + userStore.lastName)}&background=FFC107&color=000&size=128`"
              alt="Avatar"
              class="rounded-circle mb-3 shadow-sm"
              width="128"
              height="128"
            />

            <!-- Full Name & Role -->
            <h2 class="fw-bold mb-2 text-dark">
              {{ userStore.firstName }} {{ userStore.lastName }}
            </h2>
            <span :class="userStore.isAdmin ? 'badge bg-secondary text-light' : 'badge bg-secondary text-light'"
            >
              {{ userStore.isAdmin ? 'Admin' : 'Customer' }}
            </span>

            <hr class="my-4" />

            <!-- Contact Info -->
            <div class="text-start">
              <h5 class="fw-semibold mb-3">Contact Information</h5>
              <ul class="list-unstyled">
                <li><strong>Email:</strong> {{ userStore.email }}</li>
                <li><strong>Mobile No:</strong> {{ userStore.mobileNo || 'Not Provided' }}</li>
              </ul>
            </div>

            <!-- Outline Buttons -->
            <div class="d-grid gap-3 mt-4">
              <button
                class="btn btn-warning w-100 py-2 px-3 fw-semibold shadow-sm d-flex justify-content-center align-items-center"
                @click="viewOrders"
              >
                <i class="bi bi-cart2 me-2 fs-5 px-2"></i>
                <span class="d-none d-sm-inline">View Orders</span>
                <span class="d-sm-none">Orders</span>
              </button>
              <button
                class="btn btn-success w-100 py-2 px-3 fw-semibold shadow-sm d-flex justify-content-center align-items-center"
                @click="goToUpdateProfile"
              >
                <i class="bi bi-pencil-square me-2 fs-5 px-2"></i>
                <span class="d-none d-sm-inline">Update Profile</span>
                <span class="d-sm-none">Update</span>
              </button>

              <button
                class="btn btn-danger w-100 py-2 px-3 fw-semibold shadow-sm d-flex justify-content-center align-items-center"
                @click="goToResetPassword"
              >
                <i class="bi bi-key me-2 fs-5 px-2"></i>
                <span class="d-none d-sm-inline">Reset Password</span>
                <span class="d-sm-none">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  font-size: 0.9rem;
  padding: 0.5em 1em;
}

.card-body h2 {
  color: #ffc107;
}

/* Outline Button Styling with Transition */
button.btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 1rem;
  min-height: 48px;
  border-radius: 0.5rem;
}

button.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.1);
}

@media (max-width: 576px) {
  button.btn {
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
  }
}
</style>
