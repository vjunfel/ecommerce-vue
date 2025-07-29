import api from "@/api";
import { defineStore } from "pinia";


export const useCartStore = defineStore("cart", {
	state: () => ({
		cartItems: [],
    orderedOn: null,
		userId: null,
		cartId: null,
		cart: null,
		quantity: null,
		shippingFee: 50,
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
		
		async updateQuantity( productId, newQuantity) {
			try {
				const res = await api.patch("/cart/update-cart-quantity", {
					productId, newQuantity
				});
				
				// console.log("RESPONSE ======>>>", res.data);
				
				const prod = res.data.updatedCart.cartItems.filter(p => p.productId === productId)
				this.quantity = prod[0].quantity
				this.cartItems = res.data.updatedCart.cartItems;
				
				// console.log("******** QUANTITY **********", prod[0].quantity);
				
			} catch (err) {
				console.error("Failed to fetch cart:", err);
			}
		},

		async getUserCart() {
			try {
				const res = await api.get("/cart/get-cart");
				
				// console.log("RESPONSE data", res.data);
				// console.log("RESPONSE CART", res.data.cart);
				// console.log("RESPONSE CART-ITEMS", res.data.cart.cartItems);

				if (res.status !== 200) {
					throw new Error("No data found!");
				}
				
				this.cart = res.data;
				this.cartItems = res.data.cart.cartItems;
				this.userId = res.data.cart.userId;
				this.cartId = res.data.cart._id;
				this.quantity = res.data.cart.cartItems.quantity
				this.orderedOn = res.data.cart.orderedOn
				
			} catch (error) {
				console.error("Failed to fetch cart:", error);
			}
		},

		async addToCart(item) {
			const existing = this.cartItems.find((i) => i._id === item._id);
			if (existing) {
				existing.quantity += item.quantity;
			} else {
				this.cartItems.push({ ...item });
			}
		},

		async removeFromCart(selectedId) {
			const res = await api.patch(`/cart/${selectedId}/remove-from-cart`);
			
			if (res.status !== 200) {
					throw new Error("No data found!");
			}
			
			this.cartItems = [...this.cartItems.filter(item => item.productId !== selectedId)];
		},

		async clearCart() {
			try {
				const res = await api.put("/cart/clear-cart");
				
				// console.log("CART CLEARED", res.data.cart);

				if (res.status !== 200) {
					throw new Error("No data found!");
				}
				
				this.cartItems = [];
				
			} catch (error) {
				console.error("Failed to fetch cart:", error);
			}
		},
		
		async chekoutCartItems(orderPayload) {
			try {
				const res = await api.post("/orders/checkout", { orderPayload });
				
				console.log("CHECKOUT", res);
				console.log("CHECKOUT data", res.data);

				if (res.status !== 201) {
					throw new Error("No data found!");
				}
				
				// this.cartItems = [];
				
			} catch (error) {
				console.error("Failed to fetch cart:", error);
			}
		}
	},
});
