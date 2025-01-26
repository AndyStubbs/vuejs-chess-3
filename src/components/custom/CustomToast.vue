<template>
	<div class="toast" :class="className" :style="toastStyle">
		<div class="contents">
			<div class="symbol">{{ symbol }}</div>
			<div class="message" :title="message">{{ message }}</div>
			<CustomButton variant="icon" @click="dismiss"> &times; </CustomButton>
		</div>
		<Transition name="border">
			<div v-if="showBorder" class="border" :style="borderStyle">&nbsp;</div>
		</Transition>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CustomButton from "@/components/custom/CustomButton.vue";

const props = defineProps({
	status: {
		type: String,
		default: "info",
	},
	message: String,
	index: {
		type: Number,
		required: true,
	},
	offset: {
		type: Number,
		default: 16,
	},
	duration: {
		type: Number,
		default: 5000,
	},
	onDismiss: Function,
});

const SYMBOLS = {
	info: "ℹ",
	warn: "⚠",
	success: "✓",
	error: "✗",
};
const symbol = ref(SYMBOLS[props.status]);
const showBorder = ref(true);
const className = computed(() => (SYMBOLS[props.status] ? props.status : "info"));

// Define width ranges based on the message length
const widthRanges = [200, 250, 300, 325, 350, 380, 420, 460];

const toastStyle = computed(() => {
	// Determine width based on message length
	const messageLength = props.message.length;
	let widthIndex = Math.floor(messageLength / 10);
	widthIndex = Math.min(widthIndex, widthRanges.length - 1);

	const width = widthRanges[widthIndex];
	return {
		width: `${width}px`,
		top: `${props.index * (80 + props.offset) + 60}px`,
	};
});

// Border style for dynamic duration
const borderStyle = computed(() => ({
	"--transition-duration": `${props.duration}ms`,
}));

onMounted(() => {
	showBorder.value = false;
});

function dismiss() {
	if (props.onDismiss) {
		props.onDismiss(props.index);
	}
}
</script>

<style scoped>
.toast {
	position: fixed;
	right: 16px;
	width: 300px;
	height: 80px;
	border-radius: 16px;
	box-shadow: 2px 2px 4px 2px #00000055;
	font-size: 16px;
	color: white;
	text-shadow: 1px 1px 4px black;
	line-height: 16px;
	transition:
		transform 0.3s ease,
		opacity 0.3s ease;
	margin: 0;
	padding: 0;
}
.contents {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	column-gap: 16px;
	padding: 8px;
}
.toast.hidden {
	opacity: 0;
	transform: translateX(-100%);
}
.toast .message {
	max-height: 65px;
	overflow: hidden;
	text-overflow: ellipsis;
}
.symbol {
	border-radius: 32px;
	min-width: 32px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	text-shadow: 1px 1px 4px black;
}
.dark .info {
	background-color: rgba(128, 128, 128, 0.5);
}
.info {
	background-color: rgba(68, 68, 68, 0.75);
}
.info .symbol {
	color: white;
	background-color: #ffffff33;
}
.info .border {
	background-color: rgba(245, 245, 245, 0.75);
}
.dark .warn {
	background-color: rgba(195, 166, 1, 0.5);
}
.warn {
	background-color: rgba(128, 98, 1, 0.85);
	color: rgb(225, 195, 1);
}
.warn .symbol {
	color: gold;
	background-color: #ffffff33;
}
.warn .border {
	background-color: rgba(255, 217, 0, 0.875);
}
.dark .success {
	background-color: rgba(51, 136, 51, 0.5);
}
.success {
	background-color: rgba(25, 116, 51, 0.85);
	color: rgb(177, 255, 177);
}
.success .symbol {
	color: rgb(4, 98, 4);
	background-color: #9ccda7a3;
}
.success .border {
	background-color: rgba(54, 245, 54, 0.75);
}
.dark .error {
	background-color: rgba(244, 72, 72, 0.5);
}
.error {
	background-color: rgba(212, 52, 52, 0.85);
	color: rgb(255, 200, 200);
}
.error .symbol {
	color: rgb(213, 4, 4);
}
.error .border {
	background-color: rgb(235, 4, 4, 0.85);
}
.toast button {
	font-size: 26px;
	padding: 0;
	min-width: 32px;
	height: 32px;
	color: white;
}
.border {
	position: relative;
	top: -3px;
	left: 10px;
	width: calc(100% - 20px);
	height: 2px;
	border-radius: 16px;
}
.border-enter-active,
.border-leave-active {
	transition: width var(--transition-duration, 5000ms) linear;
}

.border-enter-from,
.border-leave-to {
	width: 0;
}
</style>
