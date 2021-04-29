import React from 'react';
import styles from './NimBoard.module.css';
import {Link} from "react-router-dom";

class Token
    extends React.Component {
    render() {
        return (
            <div
                className={this.props.active ? styles['highlighted-token'] : styles['token']}
                onMouseEnter={() => this.props.onMouseEnter(this.props.id)}
                onMouseLeave={this.props.onMouseLeave}
                onClick={() => this.props.onClick(this.props.id)}
            />
        );
    }
}

class Pile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { highlightedToken: undefined };
    }

    onMouseEnterToken = (key) => {
        this.setState({highlightedToken: key});
    };

    onMouseLeaveToken = () => {
        this.setState({highlightedToken: undefined});
    };

    onClickToken = (key) => {
        this.setState({highlightedToken: undefined});
        this.props.takeChips(key+1);
    };

    render() {
        let renderedTokens = [];
        for (let i = 0; i < this.props.numTokens; i++) {
            renderedTokens.push(
                <Token key={i}
                       id={i}
                       active={(this.state.highlightedToken === undefined) ? false : i <= this.state.highlightedToken}
                       onMouseEnter={this.onMouseEnterToken}
                       onMouseLeave={this.onMouseLeaveToken}
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

export class NimBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: undefined };
    }

    render() {
        let piles = this.props.G.piles;

        let renderedPiles = [];
        for (let i = 0; i < piles.length; i++) {
            renderedPiles.push(
                <Pile key={i} numTokens={piles[i]} takeChips={(j) => this.props.moves.takeChips(i,j)}/>
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
            <Link id={"restart"} to={'#'}>Restart</Link>
        </div>;

        return (
            <div className={styles['board-wrapper']}>
                {status}
                <div className={styles['board']}>
                    {renderedPiles}
                </div>
                {menu}
            </div>
        );
    }
}