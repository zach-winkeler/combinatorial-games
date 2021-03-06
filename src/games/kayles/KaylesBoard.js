import React from 'react';
import styles from './KaylesBoard.module.css';
import {Link} from "react-router-dom";
import {range} from "../../util/Range";
import { ReactComponent as Pin } from '../../resources/bowling-pin.svg';
import { ReactComponent as Triangle } from '../../resources/triangle.svg';

const RULES = <div className={styles['rectangle']}>
    Players take turns bowling a ball at a row of pins. <br/>
    A player can either hit one pin, or two adjacent pins. <br/>
    The player who bowls down the last pin wins.
</div>;

export class KaylesBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showRules: false };
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

    onClickPin(i) {
        console.log(this.props);
        this.props.moves.knockOnePin(i);
    }

    onClickTriangle(i) {
        this.props.moves.knockTwoPins(i);
    }

    toggleRules = () => {
        this.setState({showRules: !this.state.showRules});
    }

    render() {
        let pins = []
        for (const i of range(this.props.G.pins.length-1)) {
            pins.push(this.props.G.pins[i]
                ? <Pin fill={"black"} key={"pin"+i} onClick={() => this.onClickPin(i)}/>
                : <Pin key={"pin"+i} fillOpacity={0}/>);
            pins.push(this.props.G.pins[i] && this.props.G.pins[i+1]
                ? <Triangle fill={"black"} key={"tri"+i} onClick={() => this.onClickTriangle(i)}/>
                : <Triangle key={"tri"+i} fillOpacity={0}/>);
        }
        const i = this.props.G.pins.length-1;
        pins.push(this.props.G.pins[i]
            ? <Pin fill={"black"} key={"pin"+i} onClick={() => this.onClickPin(i)}/>
            : <Pin key={"pin"+i} fillOpacity={0}/>);

        let menu = <div className={styles['menu']}>
            <Link to={'/'}>Back</Link>
            <button id={styles['rulesButton']} onClick={() => this.toggleRules()}>Rules</button>
            <Link to={'#'}>Restart</Link>
        </div>;

        return (
            <div className={styles['board-wrapper']}>
                {this.getStatus()}
                <div className={styles['board']}>
                    {pins}
                </div>
                {menu}
                {this.state.showRules ? RULES : ''}
            </div>
        );
    }
}