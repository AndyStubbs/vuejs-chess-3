<template>
	<button :class="className"><slot /></button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
	variant: {
		type: String,
		default: "1",
	},
});
const className = computed(() => `btn-${props.variant}`);
</script>

<style scoped>
button {
	cursor: pointer;
	padding: 5px 10px;
	border-radius: 5px;
	transition-duration: 0.35s;
	min-width: 80px;
}
button:disabled {
	opacity: 0.8;
	cursor: not-allowed;
}

/* Button 1 */
.btn-1 {
	color: var(--btn-fg-color-1);
	background-color: var(--btn-bg-color-1);
	border-color: var(--btn-border-color-1);
	border: 1px solid var(--btn-border-color-1);
}
.btn-1:hover {
	background-color: var(--btn-hover-bg-color-1);
}
.btn-1:disabled {
	background-color: var(--btn-disabled-bg-color-1);
}

/* Button 2 */
.btn-2 {
	color: var(--btn-fg-color-2);
	background-color: var(--btn-bg-color-2);
	border-color: var(--btn-border-color-2);
	border: 1px solid var(--btn-border-color-2);
}
.btn-2:hover {
	background-color: var(--btn-hover-bg-color-2);
}
.btn-2:disabled {
	background-color: var(--btn-disabled-bg-color-2);
}

/* Button 3 */
.btn-3 {
	color: var(--btn-fg-color-3);
	background-color: var(--btn-bg-color-3);
	border-color: var(--btn-border-color-3);
	border: 1px solid var(--btn-border-color-3);
}
.btn-3:hover {
	background-color: var(--btn-hover-bg-color-3);
}
.btn-3:disabled {
	background-color: var(--btn-disabled-bg-color-3);
}

button.btn-icon,
button.btn-link,
button.btn-icon-b {
	background-color: rgba(0, 0, 0, 0);
	border: none;
	padding: 0.5rem 1rem;
	cursor: pointer;
	border-radius: 3px;
	font-family: var(--font-body);
	transition-duration: 0.35s;
	min-width: auto;
}
button.btn-icon:hover {
	opacity: 0.8;
	transform: scale(1.1);
}
button.btn-icon:disabled,
button.btn-icon-b:disabled {
	opacity: 0.35;
}

button.btn-icon-b {
	border: 1px solid var(--fg-color-1);
}
button.btn-icon-b:hover {
	background-color: var(--bg-color-2);
	opacity: 0.8;
}

button.btn-link {
	font-family: var(--font-header);
	font-size: medium;
	color: var(--link-color);
	text-decoration: underline;
}
.btn-link:hover {
	color: var(--link-hover-color);
}
</style>
