<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="20 20 60 60"
		stroke="currentColor"
	>
		<!-- Eye outline -->
		<path
			d="M25,50 Q50,20 75,50 Q50,80 25,50 Z"
			fill="white"
			stroke="black"
			stroke-width="2"
		></path>

		<!-- Pupil -->
		<circle cx="50" cy="50" r="10" fill="black"></circle>

		<!-- Slash -->
		<g v-if="props.slash" class="eye-slash">
			<line x1="24.5" y1="63.5" x2="74.5" y2="33.5" stroke="white" stroke-width="3"></line>
			<line x1="26" y1="66" x2="76" y2="36" stroke="black" stroke-width="3"></line>
		</g>
	</svg>
</template>
<script setup>
const props = defineProps({
	slash: {
		type: Boolean,
		default: false,
	},
});
</script>
