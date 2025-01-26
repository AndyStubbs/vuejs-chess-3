//compoasables/bots/randy.js

"use strict";

export function useBot() {
	const id = "randy";
	const name = "Randy";
	const rating = 0;
	let isWaiting = false;
	const getMove = async (chess) => {
		const moves = chess.moves({ verbose: true });
		isWaiting = true;
		return new Promise((resolve) => {
			setTimeout(() => {
				isWaiting = false;
				resolve(moves[Math.floor(Math.random() * moves.length)]);
			}, Math.random() * 1000);
		});
	};

	const updateEngine = () => {
		return null;
	};

	return {
		id,
		name,
		rating,
		getMove,
		updateEngine,
		isWaiting,
	};
}
