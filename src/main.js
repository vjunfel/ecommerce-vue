import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'notyf/notyf.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import HomePage from './pages/HomePage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import ErrorPage from './pages/ErrorPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import AddProduct from "./pages/AddProduct.vue";
import UpdateProduct from './pages/UpdateProduct.vue';
import DashboardPage from './pages/DashboardPage.vue';
import CartPage from './pages/CartPage.vue';
import ProductDetailsPage from './pages/ProductDetailsPage.vue';
import ResetPassword from './components/ResetPassword.vue';
import UpdateProfile from './components/UpdateProfile.vue';
import OrdersPage from './pages/OrdersPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage 
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
        {
          path: '/profile',
          name: 'Profile',
          component: ProfilePage
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: DashboardPage
        },
        {
            path: '/products',
            name: 'Products',
            component: ProductsPage
        },
        {

          path: "/products/:id",
          component: ProductDetailsPage
        },
        {
          path: "/add-product",
          name: "AddProduct",
          component: AddProduct
        },
        {
          path: "/update-product/:id",
          name: "UpdateProduct",
          component: UpdateProduct
        },
        {
          path: "/orders",
          name: "Orders",
          component: OrdersPage
        },
        {
          path: "/cart",
          name: "Cart",
          component: CartPage,
        },
        {
          path: "/reset-password",
          name: "ResetPassword",
          component: ResetPassword,
        },
        {
          path: "/update-profile",
          name: "UpdateProfile",
          component: UpdateProfile, 
        },
        {
          path: '/:catchAll(.*)',
          component: ErrorPage
        }  
    ]
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(VueSweetalert2);
app.use(router)
app.mount('#app');
