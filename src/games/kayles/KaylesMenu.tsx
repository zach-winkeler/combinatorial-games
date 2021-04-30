import {Link} from "react-router-dom";
import React from "react";
import queryString from "query-string";

interface IProps {

}

interface IState {
    firstPlayer: string,
    numPins: number
}

class ChessboardMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            firstPlayer: 'human',
            numPins: 13
        };
    }

    handleFirstPlayerChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({firstPlayer: e.target.value})
    }

    handleNumPinsChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({numPins: parseInt(e.target.value)})
    }

    render() {
        return (
            <>
                <h3>Kayles:</h3>
                <ul>
                    <li>First player: <select onChange={(e) => this.handleFirstPlayerChange(e)}>
                        <option value={"human"}>You</option>
                        <option value={"bot"}>Bot</option>
                        <option value={"random"}>Random</option>
                    </select></li>
                    <li>Number of pins: <input type={"number"} defaultValue={13} onChange={(e) => this.handleNumPinsChange(e)}/></li>
                </ul>
                <Link to={{pathname: "/kayles/" + queryString.stringify(this.state)}}><button>Play</button></Link>
            </>
        );
    }
}

export default ChessboardMenu;