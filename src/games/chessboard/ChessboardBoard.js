import React from "react";
import {range} from "../../util/Range";
import styles from './ChessboardBoard.module.css';
import {Link} from "react-router-dom";

export class ChessboardBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { highlightedSquare: undefined, players: undefined };
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
                        onMouseLeave={() => this.onMouseLeaveSquare()}
                    >{
                        ((this.props.G.pos[0] === i) && (this.props.G.pos[1] === j)) ?
                            String.fromCharCode(9820) : (
                                ((this.state.highlightedSquare !== undefined)
                                    && (this.state.highlightedSquare[0] === i)
                                    && (this.state.highlightedSquare[1] === j))

                                    ? String.fromCharCode(9814) : ''
                            )
                    }
                    </div></td>
                );
            }
            rows.push(
                <tr>{row}</tr>
            );
        }

        let menu = <div className={styles['menu']}>
            <Link id={"back"} to={'/'}>Back</Link>
            <Link id={"restart"} to={'#'}>Restart</Link>
        </div>;

        return (
            <div className={styles['board-wrapper']}>
                {this.getStatus()}
                <table className={styles['board']}>
                    <tbody>{rows}</tbody>
                </table>
                {menu}
            </div>
        );
    }
}