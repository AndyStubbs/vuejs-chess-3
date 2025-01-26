<template>
	<div
		v-if="isVisible"
		class="modal-overlay"
		@mousedown="handleMouseDown"
		@click="handleBackdropClick"
		@keydown.esc="closeModal"
	>
		<div class="modal-content" @click.stop ref="focusTrapElement" v-bind="$attrs">
			<div class="modal-header">
				<h3 v-if="title">{{ title }}</h3>
				<CustomButton class="close-button" @click="closeModal" variant="icon"
					>&times;</CustomButton
				>
			</div>
			<div class="modal-body">
				<slot />
			</div>
			<div v-if="slots.footer" class="modal-footer">
				<slot name="footer" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { useSlots, ref } from "vue";
import CustomButton from "@/components/custom/CustomButton.vue";
import { useFocusTrap } from "@/composables/useFocusTrap";
defineOptions({
	inheritAttrs: false,
});
const slots = useSlots();
const { focusTrapElement } = useFocusTrap();
const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	isVisible: {
		type: Boolean,
		required: true,
	},
	closeOnBackdrop: {
		type: Boolean,
		default: true,
	},
});
const isMouseDownInsideModal = ref(false);
const emit = defineEmits(["close"]);

function closeModal() {
	emit("close");
}

function handleMouseDown(event) {
	isMouseDownInsideModal.value = focusTrapElement.value?.contains(event.target);
}

function handleBackdropClick() {
	if (props.closeOnBackdrop && !isMouseDownInsideModal.value) {
		closeModal();
	}
}
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--dark-overlay);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-content {
	background: var(--bg-color-2);
	padding: 1.5rem;
	border-radius: 8px;
	width: 100%;
	max-width: 500px;
	box-shadow: 0 2px 10px var(--shadow-color-2);
	position: relative;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid currentColor;
	padding-bottom: 0.5rem;
	margin-bottom: 1rem;
}

.close-button {
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: var(--fg-color-1);
}

.modal-footer {
	margin-top: 1rem;
	text-align: right;
}

@media screen and (max-width: 500px) {
	.modal-overlay {
		flex-direction: column;
		justify-content: flex-start;
	}
	.modal-content {
		box-shadow: none;
		border-radius: 0;
	}
}
</style>
