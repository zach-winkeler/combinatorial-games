import React from "react";
import {range} from "../../util/Range";
import styles from './ChessboardBoard.module.css';
import {Link} from "react-router-dom";

const RULES = <div className={styles['rectangle']}>
    Players take turns moving the chess piece closer to the star. <br/>
    The player who moves the chess piece onto the starred square wins.
</div>

export class ChessboardBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { highlightedSquare: undefined, players: undefined, showRules: false };
    }

    getStatus() {
        const playerID = parseInt(this.props.ctx.currentPlayer);
        if (this.props.ctx.gameover) {
            const winner = parseInt(this.props.ctx.gameover.winner);
            return <div className={styles['status']}>
                {((winner === 0) ? 'You' : 'The bot') + ' won!'}
            </div>;
        } else {
            return <div className={styles['status']}>
                {'It is ' + ((playerID === 0) ? 'your' : "the bot's") + " turn."}
            </div>;
        }
    }

    onMouseEnterSquare = (key) => {
        this.setState({highlightedSquare: key});
    };

    onMouseLeaveSquare = () => {
        this.setState({highlightedSquare: undefined});
    };

    onClickSquare = (key) => {
        this.setState({highlightedSquare: undefined});
        this.props.moves.movePiece(key);
    };

    toggleRules = () => {
        this.setState({showRules: !this.state.showRules});
    }

    getChessPiece(white) {
        if (white) {
            switch (this.props.G.piece) {
                case 'rook':
                    return String.fromCharCode(9814);
                case 'queen':
                    return String.fromCharCode(9813);
                case 'knight':
                    return String.fromCharCode(9816);
                default:
                    throw Error('invalid piece');
            }
        } else {
            switch (this.props.G.piece) {
                case 'rook':
                    return String.fromCharCode(9820);
                case 'queen':
                    return String.fromCharCode(9819);
                case 'knight':
                    return String.fromCharCode(9822);
                default:
                    throw Error('invalid piece');
            }
        }
    }

    squareContents(G, i, j) {
        if ((this.props.G.pos[0] === i) && (this.props.G.pos[1] === j)) {
            return this.getChessPiece(false);
        }
        if ((this.state.highlightedSquare !== undefined)
            && (this.state.highlightedSquare[0] === i)
            && (this.state.highlightedSquare[1] === j)) {
            return this.getChessPiece(true);
        }
        if (G.piece === 'knight') {
            if (i <= 1 && j <= 1) {
                return String.fromCharCode(9733);
            }
        } else {
            if (i === 0 && j === 0) {
                return String.fromCharCode(9733);
            }
        }
        return '';
    }

    render() {
        let rows = [];
        for (const i of range(8)) {
            let row = [];
            for (const j of range(8)) {
                row.push(
                    <td><div
                        id={[i,j]}
                        key={[i,j]}
                        className={((i+j) % 2 === 0) ? styles['light-square'] : styles['dark-square']}
                        onClick={() => this.onClickSquare([i,j])}
                        onMouseEnter={() => this.onMouseEnterSquare([i,j])}
                        onMouseLeave={() => this.onMouseLeaveSquare()}>
                        {this.squareContents(this.props.G, i, j)}
                    </div></td>
                );
            }
            rows.push(
                <tr>{row}</tr>
            );
        }

        let menu = <div className={styles['menu']}>
            <Link to={'/'}>Back</Link>
            <button id={styles['rulesButton']} onClick={() => this.toggleRules()}>Rules</button>
            <Link to={'#'}>Restart</Link>
        </div>;

        return (
            <div className={styles['board-wrapper']}>
                {this.getStatus()}
                <table className={styles['board']}>
                    <tbody>{rows}</tbody>
                </table>
                {menu}
                {this.state.showRules ? RULES : ''}
            </div>
        );
    }
}