import {INVALID_MOVE, TurnOrder} from 'boardgame.io/core';
import {range} from "../../util/Range";

function isVictory(G) {
    return !G.pins.some((p) => p);
}

export function KaylesRules(humanFirst, numPins) {
    return {
        name: 'Kayles',

        setup: () => ({pins: Array(numPins).fill(true)}),

        turn: {
            moveLimit: 1,
            order: TurnOrder.CUSTOM(humanFirst ? ['0','1'] : ['1','0'])
        },

        moves: {
            knockOnePin: (G, ctx, i) => {
                if (G.pins[i]) {
                    G.pins[i] = false;
                } else {
                    return INVALID_MOVE;
                }
            },
            knockTwoPins: (G, ctx, i) => {
                if (G.pins[i] && G.pins[i+1]) {
                    G.pins[i] = false;
                    G.pins[i+1] = false;
                } else {
                    return INVALID_MOVE;
                }
            }
        },

        endIf: (G, ctx) => {
            if (isVictory(G)) {
                return {winner: ctx.currentPlayer};
            }
        },

        ai: {
            enumerate: (G, ctx) => {
                let moves = [];
                for (const i of range(G.pins.length)) {
                    if (G.pins[i]) {
                        moves.push({move: 'knockOnePin', args: [i]})
                    }
                    if (G.pins[i] && G.pins[i+1]) {
                        moves.push({move: 'knockTwoPins', args: [i]})
                    }
                }
                return moves;
            },
        }
    };
}
