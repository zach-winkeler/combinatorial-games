import { Client } from 'boardgame.io/react';
import { Local } from "boardgame.io/multiplayer";
import { MCTSBot } from "boardgame.io/ai";
import * as React from "react";
import { NimRules } from './NimRules';
import { NimBoard } from './NimBoard';
import {randomElement} from "../../util/Random";

export interface NimProps {
    firstPlayer: string
    randomPiles: boolean,
    startingPiles?: number[],
    numPiles?: number,
    maxPileSize?: number
}

class NimClient extends React.Component<NimProps> {
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
            game: NimRules(this.getHumanFirst(), this.props.randomPiles ? undefined : this.props.startingPiles,
                this.props.numPiles, this.props.maxPileSize),
            board: NimBoard,
            multiplayer: this.createMultiplayer(),
            debug: false
        });
        return <ClientInstance playerID={"0"}/>;
    }
}

export default NimClient;