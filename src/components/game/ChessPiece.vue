<template>
	<img
		:src="PIECES[square.type]"
		width="10"
		height="10"
		draggable="false"
		@mousedown="mousedown"
		@mouseup="mouseup"
		:style="{
			left: `${x}px`,
			top: `${y}px`,
			cursor,
			zIndex: isDragging ? 1 : 0,
			transitionDuration: transition,
		}"
	/>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGameStore } from "@/stores/game";
import { PIECES } from "@/utils/constants";

const gameStore = useGameStore();
const props = defineProps({
	square: Object,
});
const emit = defineEmits(["onPieceMoved"]);
const isDragging = ref(false);
const mousePosX = ref(0);
const mousePosY = ref(0);
const x = ref(0);
const y = ref(0);
const transition = ref("0");
let hoverElement = null;
let moves = null;

const cursor = computed(() => {
	if (gameStore.turn === gameStore.userColor && props.square.color === gameStore.userColor) {
		return isDragging.value ? "grabbing" : "grab";
	}
	return "not-allowed";
});

const mousedown = () => {
	if (props.square.color !== gameStore.userColor || gameStore.turn !== gameStore.userColor) {
		return;
	}
	hoverElement = null;
	isDragging.value = true;
	moves = gameStore.getValidMoves(props.square.square);
	gameStore.clearMarks();
	gameStore.clearHovered();
	moves.forEach((move) => {
		gameStore.addMark(move.to, "move-mark");
	});
	transition.value = "";
	gameStore.addMark(props.square.square, "reset-mark");
};
const mouseup = () => {
	isDragging.value = false;
	transition.value = "0.25s";
	if (!hoverElement) {
		x.value = 0;
		y.value = 0;
		return;
	}
	const moveSquare = hoverElement.dataset.square;
	const selectedMoves = [];
	if (moveSquare !== "") {
		for (const move of moves) {
			if (move.to === moveSquare) {
				selectedMoves.push(move);
			}
		}
	}
	if (selectedMoves.length < 2) {
		x.value = 0;
		y.value = 0;
	}
	hoverElement = null;
	emit("onPieceMoved", {
		moves: selectedMoves,
		onComplete: () => {
			x.value = 0;
			y.value = 0;
		},
	});
};
window.addEventListener("mousemove", (e) => {
	if (isDragging.value) {
		const diffX = e.clientX - mousePosX.value;
		const diffY = e.clientY - mousePosY.value;
		x.value += diffX;
		y.value += diffY;

		// Get the hover square
		let isOverGame = false;
		const elementsOver = document.elementsFromPoint(mousePosX.value, mousePosY.value);
		elementsOver.forEach((el) => {
			if (el.classList.contains("game")) {
				isOverGame = true;
			}
			if (el.classList.contains("chess-square") && hoverElement !== el) {
				hoverElement = el;
				gameStore.addHovered(hoverElement.dataset.square);
			}
		});

		// If dragging outside the game area
		if (!isOverGame) {
			hoverElement = null;
			gameStore.clearHovered();
			x.value = 0;
			y.value = 0;
			isDragging.value = false;
			transition.value = "0.25s";
		}
	}
	mousePosX.value = e.clientX;
	mousePosY.value = e.clientY;
});
</script>

<style scoped>
img {
	position: relative;
	width: var(--square-size);
	height: var(--square-size);
}
</style>
