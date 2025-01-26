<template>
	<div>
		<h1>Home Page</h1>
		<TestMessage />
		<TestModal />
		<CustomButton @click="toast">Toast</CustomButton>
	</div>
</template>

<script setup>
import TestModal from "@/components/TestModal.vue";
import CustomButton from "@/components/custom/CustomButton.vue";
import { useToastStore } from "@/stores/toast.js";

const toastStore = useToastStore();
const STATUS = ["success", "info", "warn", "error"];
const MESSAGES = [
	"The text-overflow property in CSS is used to specify how overflowed content that is not displayed should be signaled to the user. It can be clipped, display an ellipsis (...), or display a custom string",
	"The text-overflow property in CSS is used to specify how overflowed content that is not displayed should be signaled to the user. It can be clipped, display",
	"The text-overflow property in CSS is used to specify how overflowed content that is not displayed should be signaled to the user.",
	"The text-overflow property in CSS is used to specify how overflowed content that is not displayed should be",
	"The text-overflow property in CSS is used to specify how overflowed content",
	"The text-overflow property",
	"The text-overflow",
	"The text-",
	"hi",
];
function toast() {
	const status = STATUS[Math.floor(Math.random() * STATUS.length)];
	toastStore.addToast({
		//message: `This is a ${status} message!`,
		message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
		status: status,
		duration: 50000,
	});
}
</script>
