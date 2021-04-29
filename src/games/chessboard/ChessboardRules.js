import {INVALID_MOVE, TurnOrder} from 'boardgame.io/core';
import {getRandomInt} from "../../util/Random";
import {range} from "../../util/Range";

function isVictory(G) {
    return (G.pos[0] === 0) && (G.pos[1] === 0);
}

function randomInitialPos() {
    return [getRandomInt(1,8), getRandomInt(1,8)];
}

function isValidMove(G, ctx, pos) {
    return ((pos[0] < G.pos[0]) && (pos[1] === G.pos[1])) ||
        ((pos[0] === G.pos[0]) && (pos[1] < G.pos[1]));
}

export function ChessboardRules(humanFirst) {
    return {
        name: 'Chessboard',

        setup: (ctx, setupData) => ({pos: randomInitialPos()}),

        turn: {
            moveLimit: 1,
            order: TurnOrder.CUSTOM(humanFirst ? ['0','1'] : ['1','0'])
        },

        moves: {
            movePiece: (G, ctx, pos) => {
                if (isValidMove(G, ctx, pos)) {
                    G.pos = pos;
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
                for (const i of range(G.pos[0])) {
                    moves.push({move: 'movePiece', args: [[i, G.pos[1]]]})
                }
                for (const i of range(G.pos[1])) {
                    moves.push({move: 'movePiece', args: [[G.pos[0], i]]})
                }
                return moves;
            }
        }
    };
}