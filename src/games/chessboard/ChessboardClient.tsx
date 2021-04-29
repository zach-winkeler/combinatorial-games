import { Client } from 'boardgame.io/react';
import { Local } from "boardgame.io/multiplayer";
import { MCTSBot } from "boardgame.io/ai";
import * as React from "react";
import { ChessboardRules } from './ChessboardRules';
import { ChessboardBoard } from './ChessboardBoard';
import {randomElement} from "../../util/Random";

export interface ChessboardProps {
    firstPlayer: string,
    piece: string
}

class ChessboardClient extends React.Component<ChessboardProps> {
    createMultiplayer() {
        let bots = { '1': MCTSBot };
        return Local({ bots });
    }

    getHumanFirst() {
        switch(this.props.firstPlayer) {
            case 'human':
                return true;
            case 'bot':
                return false;
            case 'random':
                return randomElement([false,true]);
        }
    }

    render() {
        const ClientInstance = Client({
            game: ChessboardRules(this.getHumanFirst(), this.props.piece),
            board: ChessboardBoard,
            multiplayer: this.createMultiplayer(),
            debug: false
        });
        return <ClientInstance playerID={"0"}/>;
    }
}

export default ChessboardClient;