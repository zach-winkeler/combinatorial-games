import {Link} from "react-router-dom";
import React from "react";
import queryString from "query-string";

interface IProps {

}

interface IState {
    firstPlayer: string
}

class ChessboardMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            firstPlayer: 'human'
        };
    }

    handleFirstPlayerChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({firstPlayer: e.target.value})
    }

    render() {
        return (
            <>
                <h3>Chessboard:</h3>
                <ul>
                    <li>First player: <select onChange={(e) => this.handleFirstPlayerChange(e)}>
                        <option value={"human"}>You</option>
                        <option value={"bot"}>Bot</option>
                        <option value={"random"}>Random</option>
                    </select></li>
                </ul>
                <Link to={{pathname: "/chessboard/" + queryString.stringify(this.state)}}><button>Play</button></Link>
            </>
        );
    }
}

export default ChessboardMenu;