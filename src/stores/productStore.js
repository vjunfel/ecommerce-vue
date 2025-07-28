import api from "@/api";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
	state: () => ({
		productId: null,
		name: null,
		description: null,
		price: null,
		isActive: null,
		src: null,
		bestseller: null,
		products: [],
		loading: null,
	}),

	actions: {
		async fetchProducts() {
			try {
				const res = await api.get("/products/active");

				// console.log("RES PRODUCTS", res.data);

				if (res.status !== 200) {
					throw new Error("No data found!");
				}

				this.products = res.data;
				this.productId = res.data._id;
				this.name = res.data.name;
				this.description = res.data.description;
				this.price = res.data.price;
				this.isActive = res.data.isActive;
				this.src = res.data.src;
				this.bestseller = res.data.bestseller;
				this.loading = false;
        
			} catch (err) {
				console.log("Error", err);
			}
		},
	},
});
