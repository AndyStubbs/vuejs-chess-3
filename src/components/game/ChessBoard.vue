<template>
	<div class="chess-board" :style="`--square-size: ${squareSize}px`">
		<div v-for="(row, rowIndex) in board" :key="rowIndex" class="chess-row">
			<div class="border-left board-label">{{ rowLabel(rowIndex) }}</div>
			<div
				v-for="square in row"
				:key="square.square"
				:data-square="square.square"
				class="chess-square"
				:class="[square.bColor, square.hovered]"
				@mouseover="$emit('squarehover')"
			>
				<div v-if="square.marked" class="mark" :class="square.marked">&nbsp;</div>
				<ChessPiece
					v-if="square.type"
					:square="square"
					@on-piece-moved="$emit('onPieceMoved', $event)"
				></ChessPiece>
			</div>
		</div>
		<div class="border-bottom">
			<div class="blank">8</div>
			<div v-for="i in 8" :key="i" class="board-label">
				{{ colLabel(i) }}
			</div>
		</div>
	</div>
</template>

<script setup>
import ChessPiece from "@/components/game/ChessPiece.vue";
const props = defineProps({
	board: Array,
	isReversed: Boolean,
});
const rowLabel = (rowIndex) => {
	if (props.isReversed) {
		return rowIndex + 1;
	}
	return 8 - rowIndex;
};
const colLabel = (colIndex) => {
	if (props.isReversed) {
		return String.fromCharCode("A".charCodeAt(0) + 8 - colIndex);
	}
	return String.fromCharCode("A".charCodeAt(0) + colIndex - 1);
};
const squareSize = 80;
</script>

<style scoped>
.chess-board {
	/*display: grid;
	grid-template-rows: repeat(8, 0fr);*/
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	user-select: none;
}
.chess-row {
	display: grid;
	grid-template-columns: repeat(9, 0fr);
}
.chess-square {
	aspect-ratio: 1 / 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: var(--square-size);
	height: var(--square-size);
}
.chess-square.white {
	background-color: var(--board-color-1-light);
}
.chess-square.black {
	background-color: var(--board-color-1-dark);
}
.chess-square.hovered {
	border: 6px inset #ffffffaa;
}
.chess-square .mark {
	position: absolute;
	width: calc(var(--square-size) * 0.67);
	height: calc(var(--square-size) * 0.67);
	text-align: center;
	border-radius: 999px;
	opacity: 0.5;
	transform: rotate(180deg);
}
.chess-square .reset-mark {
	border: 4px inset #bcbcdd;
	background-color: #93939b;
}
.chess-square .move-mark {
	border: 4px inset #0c810c;
	background-color: #23d423;
}
.border-left {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
}
.board-label {
	font-size: larger;
}
.border-bottom {
	display: grid;
	grid-template-columns: repeat(9, 0fr);
}
.blank {
	font-size: larger;
	width: 24px;
	color: #00000000;
}
.border-bottom .board-label {
	aspect-ratio: 1 / 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: var(--square-size);
	height: 32px;
}
</style>
