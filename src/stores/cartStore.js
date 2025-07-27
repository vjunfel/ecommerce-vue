import api from "@/api";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
	state: () => ({
		cartItems: [],
    orderedOn: null,
		userId: null,
		cartId: null,
		cart: null,
	}),

	getters: {
		totalItems: (state) =>
			state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
		totalPrice: (state) =>
			state.cartItems.reduce((sum, item) => sum +  item.subtotal, 0),
	},

	actions: {
		setUser(userId) {
			this.userId = userId;
		},

		async getUserCart() {
			try {
				const res = await api.get("/cart/get-cart");
				
				// console.log("RESPONSE CART", res.data.cart);

				if (res.status !== 200) {
					throw new Error("No data found!");
				}
				
				this.cart = res.data;
				this.cartItems = res.data.cart.cartItems;
				this.userId = res.data.cart.userId;
				this.cartId = res.data.cart._id;
				
			} catch (error) {
				console.error("Failed to fetch cart:", error);
			}
		},

		addToCart(item) {
			const existing = this.items.find((i) => i._id === item._id);
			if (existing) {
				existing.quantity += item.quantity;
			} else {
				this.items.push({ ...item });
			}
		},

		removeFromCart(id) {
			this.items = this.items.filter((item) => item._id !== id);
		},

		clearCart() {
			this.items = [];
		},
	},
});
