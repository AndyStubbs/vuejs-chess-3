<template>
	<div class="scoreboard" :class="active ? 'active' : undefined">
		<div class="icon">
			<img :src="color === 'b' ? PIECES.k : PIECES.K" :class="color" />
		</div>
		<div class="details">
			<div class="name">
				<div>{{ player.displayName }}</div>
				<div class="time">
					<span class="digit">{{ digit1 }}</span>
					<span class="digit">{{ digit2 }}</span>
					<span class="colon">:</span>
					<span class="digit">{{ digit3 }}</span>
					<span class="digit">{{ digit4 }}</span>
				</div>
			</div>
			<div class="captures">
				<img
					v-for="(capture, index) in player.captures"
					:key="index"
					:src="PIECES[capture]"
					:class="capture.toLowerCase()"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { PIECES } from "@/utils/constants";
const props = defineProps({
	player: Object,
	color: String,
	active: Boolean,
	startTime: Number,
});

// Refs
const time = ref(0);
setInterval(() => {
	if (props.active && props.startTime) {
		const elapsed = new Date().getTime() - props.startTime;
		time.value = props.player.timeRemaining - elapsed;
	} else {
		time.value = props.player.timeRemaining;
	}
}, 500);

const digit1 = computed(() => {
	const minutes = Math.floor(time.value / 60000);
	return minutes.toString().padStart(2, "0")[0];
});
const digit2 = computed(() => {
	const minutes = Math.floor(time.value / 60000);
	return minutes.toString().padStart(2, "0")[1];
});
const digit3 = computed(() => {
	const seconds = Math.floor((time.value % 60000) / 1000);
	return seconds.toString().padStart(2, "0")[0];
});
const digit4 = computed(() => {
	const seconds = Math.floor((time.value % 60000) / 1000);
	return seconds.toString().padStart(2, "0")[1];
});
</script>

<style scoped>
.scoreboard {
	display: flex;
	flex-direction: row;
	column-gap: 8px;
	width: 310px;
	height: 80px;
	color: var(--fg-color-1);
	border: 3px solid var(--shadow-color-1);
	box-shadow: 0 0 5px var(--shadow-color-3);
	border-radius: 9px;
	padding: 5px;
	background-color: #ffda9e66;
}
.scoreboard.active {
	border: 3px solid var(--green-color-1);
	box-shadow: 0 0 5px var(--green-color-1);
}
.details {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.player {
	display: flex;
	flex-direction: row;
}
.icon {
	background-color: #88888833;
}
.icon img {
	width: 64px;
	height: 64px;
	position: relative;
	top: -1px;
}
.name {
	display: flex;
	justify-content: space-between;
}
.time {
	padding: 0 8px;
	font-family: var(--font-time);
	font-weight: bold;
	font-size: large;
	background-color: var(--shadow-color-4);
	text-shadow: 2px 1px 11px var(--input-bg-color-1);
	color: var(--fg-color-3);
	display: flex;
}
.time .digit {
	width: 14px;
	text-align: center;
}
.time .colon {
	width: 4px;
	text-align: center;
}
.captures {
	margin-left: 12px;
}
.captures img {
	width: 30px;
	height: 30px;
	margin-left: -10px;
}
.captures img.p {
	margin-left: -25px;
}
.captures img.n {
	margin-left: -15px;
}
.captures img.b {
	margin-left: -15px;
}
.captures img.r {
	margin-left: -15px;
}
.captures img.q {
	margin-left: -10px;
}
</style>
