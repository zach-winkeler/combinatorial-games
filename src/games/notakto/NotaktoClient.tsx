import { Client } from 'boardgame.io/react';
import { Local } from "boardgame.io/multiplayer";
import { MCTSBot } from "boardgame.io/ai";
import * as React from "react";
import {NotaktoBoard} from "./NotaktoBoard";
import {NotaktoRules} from "./NotaktoRules";
import {randomElement} from "../../util/Random";

let bots = { '1': MCTSBot };
let multiplayer = Local({ bots });

export interface NotaktoProps {
    firstPlayer: string
}

class NotaktoClient extends React.Component<NotaktoProps> {
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
        let ClientInstance = Client({
            game: NotaktoRules(this.getHumanFirst()),
            board: NotaktoBoard,
            multiplayer: multiplayer,
            debug: false
        });
        return <ClientInstance playerID={"0"}/>;
    }
}

export default NotaktoClient;