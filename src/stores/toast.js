// stores/toast.js

"use strict";

import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
	state: () => ({
		toasts: [],
	}),
	actions: {
		// Add a new toast
		addToast({ message, status = "info", duration = 3000 }) {
			const id = Date.now();
			this.toasts.push({ id, message, status, duration });

			// Auto-remove toast after duration
			setTimeout(() => this.removeToast(id), duration);
		},

		// Remove a toast by ID
		removeToast(id) {
			this.toasts = this.toasts.filter((toast) => toast.id !== id);
		},
	},
});
