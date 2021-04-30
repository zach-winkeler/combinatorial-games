import { Client } from 'boardgame.io/react';
import { Local } from "boardgame.io/multiplayer";
import { MCTSBot } from "boardgame.io/ai";
import * as React from "react";
import { KaylesRules } from './KaylesRules';
import { KaylesBoard } from './KaylesBoard';
import {randomElement} from "../../util/Random";

export interface KaylesProps {
    firstPlayer: string,
    numPins: number
}

class KaylesClient extends React.Component<KaylesProps> {
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
            game: KaylesRules(this.getHumanFirst(), this.props.numPins),
            board: KaylesBoard,
            multiplayer: this.createMultiplayer(),
            debug: false
        });
        return <ClientInstance playerID={"0"}/>;
    }
}

export default KaylesClient;