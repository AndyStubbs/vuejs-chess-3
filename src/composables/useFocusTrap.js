"use strict";

import { ref, watch, onBeforeUnmount } from "vue";

export function useFocusTrap() {
	const focusTrapElement = ref(null);
	let previouslyFocusedElement = null;

	// Trap focus inside the modal
	function trapFocus(e) {
		if (!focusTrapElement.value) return;

		const focusableElements = focusTrapElement.value.querySelectorAll(
			'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (e.key === "Tab") {
			if (e.shiftKey && document.activeElement === firstElement) {
				// Shift + Tab: Move focus to the last element
				lastElement.focus();
				e.preventDefault();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				// Tab: Move focus to the first element
				firstElement.focus();
				e.preventDefault();
			}
		}
	}

	// Initialize the focus trap
	function activateFocusTrap() {
		if (!focusTrapElement.value) return;

		// Save the previously focused element
		previouslyFocusedElement = document.activeElement;

		// Move focus to the first focusable element in the modal
		const focusableElements = focusTrapElement.value.querySelectorAll(
			"a[href], area[href], input:not([disabled]), select:not([disabled]), " +
				"textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex='-1'])",
		);
		if (focusableElements.length > 0) {
			focusableElements[0].focus();
		}

		// Add event listener for trapping focus
		document.addEventListener("keydown", trapFocus);
	}

	// Deactivate the focus trap
	function deactivateFocusTrap() {
		// Remove event listener for trapping focus
		document.removeEventListener("keydown", trapFocus);

		// Restore focus to the previously focused element
		if (previouslyFocusedElement) {
			previouslyFocusedElement.focus();
		}
	}

	watch(focusTrapElement, (newValue) => {
		if (newValue) {
			activateFocusTrap();
		}
	});

	onBeforeUnmount(() => {
		deactivateFocusTrap();
	});

	return {
		focusTrapElement,
		activateFocusTrap,
		deactivateFocusTrap,
	};
}
