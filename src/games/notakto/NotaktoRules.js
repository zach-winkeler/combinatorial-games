import {INVALID_MOVE, TurnOrder} from 'boardgame.io/core';

function isVictory(G) {
    const positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    const isRowComplete = row => {
        const symbols = row.map(i => G.cells[i]);
        return symbols.every(i => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some(i => i === true);
}

export function NotaktoRules(humanFirst) {
    return {
        name: 'Notakto',

        setup: () => ({cells: Array(9).fill(null)}),

        turn: {
            moveLimit: 1,
            order: TurnOrder.CUSTOM(humanFirst ? ['0','1'] : ['1','0'])
        },

        moves: {
            clickCell: (G, ctx, id) => {
                if (G.cells[id] === null) {
                    G.cells[id] = 'X';
                } else {
                    return INVALID_MOVE;
                }
            },
        },

        endIf: (G, ctx) => {
            if (isVictory(G)) {
                return {winner: ctx.currentPlayer};
            }
        },

        ai: {
            enumerate: (G, ctx) => {
                let moves = [];
                for (let i = 0; i < 9; i++) {
                    if (G.cells[i] === null) {
                        moves.push({move: 'clickCell', args: [i]});
                    }
                }
                return moves;
            },
        }
    };
}
