<template>
	<div>
		<CustomButton @click="showModal = true" variant="1">Open Modal</CustomButton>
		<Teleport to="body">
			<CustomModal
				:isVisible="showModal"
				title="Welcome to the Modal"
				@close="showModal = false"
			>
				<p>This is the modal body content!</p>
				<CustomInput></CustomInput>
				<CustomButton>Click Me</CustomButton>
				<template #footer>
					<CustomButton @click="showModal = false" variant="1">Close</CustomButton>
				</template>
			</CustomModal>
		</Teleport>
	</div>
</template>

<script setup>
import CustomModal from "@/components/custom/CustomModal.vue";
import CustomButton from "@/components/custom/CustomButton.vue";
import CustomInput from "@/components/custom/CustomInput.vue";

import { ref } from "vue";

const showModal = ref(false);
</script>
