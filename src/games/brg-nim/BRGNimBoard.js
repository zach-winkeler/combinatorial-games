import React from 'react';
import styles from './BRGNimBoard.module.css';
import {Link} from "react-router-dom";

const RULES = <div className={styles['rectangle']}>
    Players take turns removing chips from piles. <br/>
    A player may only take a chip of their color, and all chips above it. <br/>
    You are blue, and the bot is red. <br/>
    Green chips may be taken by any player. <br/>
    The player who takes the last chip wins.
</div>

class Token
    extends React.Component {
    render() {
        return (
            <div
                className={`${styles['token']} ${styles[this.props.color]}`}
                onClick={() => this.props.onClick(this.props.id)}
            />
        );
    }
}

function toColorString(s) {
    switch (s) {
        case 'b':
            return 'blue';
        case 'r':
            return 'red';
        case 'g':
            return 'green';
        default:
            throw Error('invalid color');
    }
}

class Pile extends React.Component {
    onClickToken = (key) => {
        this.props.takeChip(key);
    };

    render() {
        let renderedTokens = [];
        let l = this.props.tokens.length;
        for (let i = 0; i < l; i++) {
            renderedTokens.push(
                <Token key={l-1-i}
                       id={l-1-i}
                       color={toColorString(this.props.tokens[l-1-i])}
                       onClick={this.onClickToken}/>
            );
        }

        let pileCount = <div className={styles['pile-count']}>{this.props.numTokens}</div>;

        return <div className={styles['pile']}>
            {renderedTokens}
            {pileCount}
        </div>
    }
}

export class BRGNimBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: undefined, showRules: false };
    }

    toggleRules = () => {
        this.setState({showRules: !this.state.showRules});
    }

    render() {
        let piles = this.props.G.piles;

        let renderedPiles = [];
        for (let i = 0; i < piles.length; i++) {
            renderedPiles.push(
                <Pile key={i} tokens={piles[i]} takeChip={(j) => this.props.moves.takeChip(i,j)}/>
            );
        }

        let status = undefined;
        const playerID = parseInt(this.props.ctx.currentPlayer);
        if (this.props.ctx.gameover) {
            const winner = parseInt(this.props.ctx.gameover.winner);
            status = <div className={styles['status']}>
                {((winner === 0) ? 'You' : 'The bot') + ' won!'}
            </div>;
        } else {
            status = <div className={styles['status']}>
                {'It is ' + ((playerID === 0) ? 'your' : "the bot's") + " turn."}
            </div>;
        }

        let menu = <div className={styles['menu']}>
            <Link id={"back"} to={'/'}>Back</Link>
            <button id={styles['rulesButton']} onClick={() => this.toggleRules()}>Rules</button>
            <Link id={"restart"} to={'#'}>Restart</Link>
        </div>;

        return (
            <div className={styles['board-wrapper']}>
                {status}
                <div className={styles['board']}>
                    {renderedPiles}
                </div>
                {menu}
                {this.state.showRules ? RULES : ''}
            </div>
        );
    }
}