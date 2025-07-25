import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'notyf/notyf.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import HomePage from './pages/HomePage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import ErrorPage from './pages/ErrorPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import ViewProduct from './pages/ViewProduct.vue';;
import DashboardPage from './pages/DashboardPage.vue';
import AddProduct from './pages/AddProduct.vue';
import UpdateProduct from './pages/UpdateProduct.vue';
import UserOrder from './pages/UserOrder.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage 
        },
        {
            path: '/products',
            name: 'Products',
            component: ProductsPage
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
          path: "/products/:id",
          component: ViewProduct
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
            path: "/user-orders",
            name: "UserOrder",
            component: UserOrder
          },
        {
          path: '/:catchAll(.*)',
          component: ErrorPage
        }  
    ]
});

const app = createApp(App)
app.use(createPinia())
app.use(VueSweetalert2);
app.use(router)
app.mount('#app');
