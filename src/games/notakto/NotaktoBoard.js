import React from 'react';
import styles from './NotaktoBoard.module.css';
import {Link} from "react-router-dom";

const RULES = <div className={styles['rectangle']}>
    Players take turns placing X's in squares on the board. <br/>
    The first player to make 3-in-a-row (horizontally, vertically, or diagonally) wins.
</div>

export class NotaktoBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: undefined, showRules: false };
    }

    toggleRules = () => {
        this.setState({showRules: !this.state.showRules});
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

    onClick(id) {
        this.props.moves.clickCell(id);
    }

    render() {
        let tbody = [];
        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = 0; j < 3; j++) {
                const id = 3 * i + j;
                cells.push(
                    <td className={styles['cell']} key={id} onClick={() => this.onClick(id)}>
                        {this.props.G.cells[id]}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        let menu = <div className={styles['menu']}>
            <Link id={"back"} to={'/'}>Back</Link>
            <button id={styles['rulesButton']} onClick={() => this.toggleRules()}>Rules</button>
            <Link id={"restart"} to={'#'}>Restart</Link>
        </div>;

        return (
            <div className={styles['board-wrapper']}>
                {this.getStatus()}
                <table className={styles['board']}>
                    <tbody>{tbody}</tbody>
                </table>
                {menu}
                {this.state.showRules ? RULES : ''}
            </div>
        );
    }
}