<template>
	<div class="form-group">
		<label v-if="label" :for="id">{{ label }}</label>
		<div :class="{ password: type === 'password' }">
			<input
				v-model="model"
				:id="id"
				:type="customType"
				v-bind="$attrs"
				:class="{ error: isError }"
				@change="isChanged = true"
			/>
			<CustomButton
				v-if="type === 'password'"
				type="button"
				variant="icon-b"
				title="Show Password"
				@click.prevent="showPassword = !showPassword"
			>
				<EyeIcon :slash="showPassword" />
			</CustomButton>
		</div>
		<div class="error-msg">
			<span v-if="isError">{{ error }}</span>
			&nbsp;
		</div>
	</div>
</template>
<script setup>
import EyeIcon from "@/components/icons/EyeIcon.vue";
import CustomButton from "@/components/custom/CustomButton.vue";
import { useId, computed, ref } from "vue";
const isChanged = ref(false);
const showPassword = ref(false);
const id = `${useId()}`;
const model = defineModel();
defineOptions({
	inheritAttrs: false,
});
const props = defineProps({
	type: {
		type: String,
		default: "text",
	},
	label: {
		type: String,
		default: "",
	},
	error: {
		type: String,
		default: "",
	},
});
const isError = computed(() => isChanged.value && props.error);
const customType = computed(() =>
	props.type === "password" && showPassword.value ? "text" : props.type,
);
</script>

<style scoped>
label {
	font-weight: bold;
}
.form-group {
	width: 100%;
}
input {
	width: 100%;
	height: 38px;
	box-sizing: border-box;
	padding: 0 6px;
}
input:focus {
	border-color: var(--status-success-color);
	outline: 1px solid var(--status-success-color);
}
input.error {
	border: 2px solid var(--status-error-color);
}
input.error:focus {
	outline: 1px solid var(--status-error-color);
}
.password {
	display: flex;
	column-gap: 12px;
}
.password button {
	width: 40px;
	height: 38px;
}
.password svg {
	position: relative;
	top: -2px;
	left: -8px;
}
.error-msg {
	color: var(--status-error-color);
}
</style>
