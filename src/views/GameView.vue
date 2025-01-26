<template>
	<div>
		<div class="game">
			<ChessBoard
				:board="gameStore.board"
				:is-reversed="gameStore.userColor === 'b'"
				@on-piece-moved="onPieceMoved"
			/>
			<div class="scoreboards">
				<PlayerScoreboard
					color="w"
					:active="!gameStore.gameover && gameStore.turn === 'w'"
					:player="gameStore.players.w"
					:start-time="gameStore.turnStartTime"
				/>
				<PlayerScoreboard
					color="b"
					:active="!gameStore.gameover && gameStore.turn === 'b'"
					:player="gameStore.players.b"
					:start-time="gameStore.turnStartTime"
				/>
			</div>
			<div class="actions">
				<CustomButton @click="run(true)">Run</CustomButton>
				<CustomButton @click="run(false)">Pause</CustomButton>
				<CustomButton @click="reset()">Reset</CustomButton>
			</div>
		</div>
	</div>
	<Teleport to="body">
		<CustomModal
			title="Promotion"
			:isVisible="showPromotion"
			style="max-width: 370px; color: white"
			@close="cancelPromotion"
		>
			<CustomButton variant="icon" @click="promote('n')">
				<img :src="gameStore.userColor === 'w' ? PIECES.N : PIECES.n" />
			</CustomButton>
			<CustomButton variant="icon" @click="promote('b')">
				<img :src="gameStore.userColor === 'w' ? PIECES.B : PIECES.b" />
			</CustomButton>
			<CustomButton variant="icon" @click="promote('r')">
				<img :src="gameStore.userColor === 'w' ? PIECES.R : PIECES.r" />
			</CustomButton>
			<CustomButton variant="icon" @click="promote('q')">
				<img :src="gameStore.userColor === 'w' ? PIECES.Q : PIECES.q" />
			</CustomButton>
		</CustomModal>
		<CustomModal title="Game Over" :is-visible="showGameOver" @close="closeGameOver">
			<div style="text-align: center">
				<div v-if="gameStore.gameover === 'tie'">
					<h3>{{ gameStore.gameoverType }}!</h3>
					<div style="display: flex; justify-content: center">
						<img :src="PIECES.K" alt="White King" />
						<img :src="PIECES.k" alt="Black King" />
					</div>
				</div>
				<div v-else>
					<h3>
						Checkmate!
						{{ gameStore.gameover ? gameStore.players[gameStore.gameover].name : "" }}
						Wins!
					</h3>
					<img :src="gameStore.gameover === 'w' ? PIECES.K : PIECES.k" alt="White King" />
				</div>
			</div>
		</CustomModal>
	</Teleport>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useGameStore } from "@/stores/game";
import CustomButton from "@/components/custom/CustomButton.vue";
import ChessBoard from "@/components/game/ChessBoard.vue";
import CustomModal from "@/components/custom/CustomModal.vue";
import PlayerScoreboard from "@/components/game/PlayerScoreboard.vue";
import { PIECES } from "@/utils/constants";

const gameStore = useGameStore();

// Refs
const showPromotion = ref(false);
const showGameOver = ref(false);

let onPromotionComplete = null;
let promotions = [];
let interval = null;
const run = (start) => {
	if (start && interval === null) {
		interval = setInterval(makeRandomMove, 10);
	} else if (!start) {
		clearInterval(interval);
		interval = null;
	}
};
const reset = () => {
	gameStore.resetGame();
};
const makeRandomMove = () => {
	gameStore.makeRandomMove();
};
const onPieceMoved = ({ moves, onComplete }) => {
	if (moves.length === 1) {
		gameStore.makeMove(moves[0]);
	} else if (moves.length > 0) {
		onPromotionComplete = onComplete;
		promotions = moves;
		showPromotion.value = true;
	}
};
const promote = (promoted) => {
	for (const move of promotions) {
		if (move.promotion === promoted) {
			gameStore.makeMove(move);
			break;
		}
	}
	showPromotion.value = false;
	onPromotionComplete();
};
const cancelPromotion = () => {
	showPromotion.value = false;
	onPromotionComplete();
};
const closeGameOver = () => {
	showGameOver.value = false;
	isGameOverShown = false;
};

// Watchs
let isGameOverShown = false;
watch(
	() => gameStore.gameover,
	(gameover) => {
		if (gameover !== null && !isGameOverShown) {
			isGameOverShown = true;
			showGameOver.value = true;
		}
	},
);

// Hooks
onMounted(() => {
	gameStore.startGame();
});
</script>

<style scoped>
.game {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.scoreboards {
	position: relative;
	left: 8px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	column-gap: 18px;
}
.actions {
	margin-top: 16px;
	display: flex;
	column-gap: 16px;
}
</style>
