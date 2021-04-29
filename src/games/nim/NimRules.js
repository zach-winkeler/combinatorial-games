import {INVALID_MOVE, TurnOrder} from 'boardgame.io/core';
import {getRandomInt} from "../../util/Random";
import {range} from "../../util/Range";

const DEFAULT_NUM_PILES = 5;
const DEFAULT_MAX_PILE_SIZE = 8;

function isVictory(G) {
    return G.piles.every((n) => n === 0);
}

function randomInitialPiles(numPiles = DEFAULT_NUM_PILES, maxPileSize = DEFAULT_MAX_PILE_SIZE) {
    let piles = []
    // eslint-disable-next-line no-unused-vars
    for (const _ of range(numPiles)) {
        piles.push(getRandomInt(1,maxPileSize + 1))
    }
    return piles;
}

export function NimRules(humanFirst, initialPiles, numPiles, maxPileSize) {
    return {
        name: 'Nim',

        setup: (ctx, setupData) => ({ piles: initialPiles || randomInitialPiles(numPiles, maxPileSize) }),

        turn: {
            moveLimit: 1,
            order: TurnOrder.CUSTOM(humanFirst ? ['0','1'] : ['1','0'])
        },

        moves: {
            takeChips: (G, ctx, pile, numChips) => {
                if (numChips > G.piles[pile]) {
                    return INVALID_MOVE;
                } else if (numChips < 1) {
                    return INVALID_MOVE;
                }
                G.piles[pile] -= numChips;
            },
        },

        endIf: (G, ctx) => {
            if (isVictory(G)) {
                return { winner: ctx.currentPlayer };
            }
        },

        ai: {
            enumerate: (G, ctx) => {
                let moves = [];
                for (const [i, numChips] of G.piles.entries()) {
                    for (const j of range(numChips)) {
                        moves.push({move: 'takeChips', args: [i,j+1]});
                    }
                }
                return moves;
            }
        }
    };
}