import {INVALID_MOVE, TurnOrder} from 'boardgame.io/core';
import {getRandomInt} from "../../util/Random";
import {range} from "../../util/Range";

function isVictory(G) {
    if (G.piece === 'knight') {
        return (G.pos[0] <= 1) && (G.pos[1] <= 1);
    } else {
        return (G.pos[0] === 0) && (G.pos[1] === 0);
    }
}

function randomInitialPos() {
    if (this.props.G.piece === 'knight') {
        return [getRandomInt(2,8), getRandomInt(2,8)];
    } else {
        return [getRandomInt(1,8), getRandomInt(1,8)];
    }
}

function isValidMove(G, ctx, pos) {
    if (pos[0] < 0 || pos[1] < 0) {
        return false;
    }
    switch (G.piece) {
        case 'rook':
            return isValidRookMove(G, pos);
        case 'queen':
            return isValidQueenMove(G, pos);
        case 'knight':
            return isValidKnightMove(G, pos);
        default:
            throw Error('invalid piece');
    }
}

function isValidRookMove(G, pos) {
    return ((pos[0] < G.pos[0]) && (pos[1] === G.pos[1])) ||
        ((pos[0] === G.pos[0]) && (pos[1] < G.pos[1]));
}

function isValidQueenMove(G, pos) {
    return ((pos[0] < G.pos[0]) && (pos[1] === G.pos[1])) ||
        ((pos[0] === G.pos[0]) && (pos[1] < G.pos[1])) ||
        ((pos[0] < G.pos[0]) && (pos[1] < G.pos[1]) &&
            (G.pos[0]-pos[0] === G.pos[1]-pos[1]));
}

function isValidKnightMove(G, pos) {
    return (G.pos[0]-1 === pos[0] && G.pos[1]-2 === pos[1]) ||
        (G.pos[0]-2 === pos[0] && G.pos[1]-1 === pos[1]) ||
        (G.pos[0]+1 === pos[0] && G.pos[1]-2 === pos[1]) ||
        (G.pos[0]-2 === pos[0] && G.pos[1]+1 === pos[1]);
}

function enumerateRookMoves(G) {
    let moves = [];
    for (const i of range(G.pos[0])) {
        moves.push({move: 'movePiece', args: [[i, G.pos[1]]]});
    }
    for (const i of range(G.pos[1])) {
        moves.push({move: 'movePiece', args: [[G.pos[0], i]]});
    }
    return moves;
}

function enumerateQueenMoves(G) {
    let moves = enumerateRookMoves(G);
    for (const i of range(1, Math.min(G.pos[0],G.pos[1]))) {
        moves.push({move: 'movePiece', args: [[G.pos[0]-i, G.pos[1]-i]]});
    }
    return moves;
}

function enumerateKnightMoves(G) {
    let moves = [];
    if (G.pos[0]-1 >= 0 && G.pos[1]-2 >= 0) {
        moves.push({move: 'movePiece', args: [[G.pos[0]-1, G.pos[1]-2]]});
    }
    if (G.pos[0]-2 >= 0 && G.pos[1]-1 >= 0) {
        moves.push({move: 'movePiece', args: [[G.pos[0]-2, G.pos[1]-1]]});
    }
    if (G.pos[0]+1 >= 0 && G.pos[1]-2 >= 0) {
        moves.push({move: 'movePiece', args: [[G.pos[0]+1, G.pos[1]-2]]});
    }
    if (G.pos[0]-2 >= 0 && G.pos[1]+1 >= 0) {
        moves.push({move: 'movePiece', args: [[G.pos[0]-2, G.pos[1]+1]]});
    }
    return moves;
}

export function ChessboardRules(humanFirst, piece) {
    return {
        name: 'Chessboard',

        setup: (ctx, setupData) => ({pos: randomInitialPos(), piece: piece}),

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
                switch (G.piece) {
                    case 'rook':
                        return enumerateRookMoves(G);
                    case 'queen':
                        return enumerateQueenMoves(G);
                    case 'knight':
                        return enumerateKnightMoves(G);
                    default:
                        throw Error('invalid piece');
                }
            }
        }
    };
}