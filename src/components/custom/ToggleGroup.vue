<template>
	<div class="toggle-group">
		<CustomButton
			v-bind="$attrs"
			v-for="option in options"
			:key="option.id"
			:class="model.id === option.id ? 'selected' : ''"
			@click="model = option"
			:variant="variant"
		>
			<slot :option="option" />
		</CustomButton>
	</div>
</template>

<script setup>
import CustomButton from "./CustomButton.vue";
defineProps({
	options: Array,
	variant: {
		type: String,
		default: "2",
	},
});
const model = defineModel();
defineOptions({
	inheritAttrs: false,
});
</script>

<style scoped>
.selected {
	border: 3px solid var(--active-item-color);
}
</style>
