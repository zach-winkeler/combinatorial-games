import {INVALID_MOVE, TurnOrder} from 'boardgame.io/core';
import {getRandomInt, randomElement} from "../../util/Random";
import {range} from "../../util/Range";

const DEFAULT_NUM_PILES = 5;
const DEFAULT_MAX_PILE_SIZE = 8;

function randomInitialPiles(colors = ['b', 'r', 'g'], numPiles = DEFAULT_NUM_PILES, maxPileSize = DEFAULT_MAX_PILE_SIZE) {
    let piles = []
    // eslint-disable-next-line no-unused-vars
    for (const _ of range(numPiles)) {
        let pile = []
        // eslint-disable-next-line no-unused-vars
        for (const _ of range(getRandomInt(1,maxPileSize+1))) {
            pile.push(randomElement(colors));
        }
        piles.push(pile);
    }
    return piles;
}

function enumerateMoves(G, ctx) {
    let moves = [];
    for (const [i, pile] of G.piles.entries()) {
        for (const j of range(pile.length)) {
            if ((ctx.currentPlayer === '1' && G.piles[i][j] !== 'b')
                || (ctx.currentPlayer === '0' && G.piles[i][j] !== 'r')) {
                moves.push({move: 'takeChip', args: [i,j]});
            }
        }
    }
    return moves;
}

export function BRGNimRules(humanFirst, initialPiles, colors, numPiles, maxPileSize) {
    return {
        name: 'Nim',

        setup: (ctx, setupData) => ({ piles: initialPiles || randomInitialPiles(colors, numPiles, maxPileSize) }),

        turn: {
            moveLimit: 1,
            order: TurnOrder.CUSTOM(humanFirst ? ['0','1'] : ['1','0'])
        },

        moves: {
            takeChip: (G, ctx, i, j) => {
                if ((j < 0) || (j >= G.piles[i].length)) {
                    return INVALID_MOVE;
                }
                let color = G.piles[i][j];
                if ((color === 'b') && (ctx.currentPlayer === '1')) {
                    return INVALID_MOVE;
                }
                if ((color === 'r') && (ctx.currentPlayer === '0')) {
                    return INVALID_MOVE;
                }
                G.piles[i] = G.piles[i].slice(0, j);
            },
        },

        endIf: (G, ctx) => {
            if (ctx.numMoves === 0 && enumerateMoves(G, ctx).length === 0) {
                return { winner: ctx.currentPlayer === '0' ? '1' : '0' };
            }
        },

        ai: {
            enumerate: enumerateMoves
        }
    };
}