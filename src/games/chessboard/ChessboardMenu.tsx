import {Link} from "react-router-dom";
import React from "react";
import queryString from "query-string";

interface IProps {

}

interface IState {
    firstPlayer: string,
    piece: string
}

class ChessboardMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            firstPlayer: 'human',
            piece: 'rook'
        };
    }

    handleFirstPlayerChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({firstPlayer: e.target.value})
    }

    handlePieceChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({piece: e.target.value})
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
                    <li>Piece: <select onChange={(e) => this.handlePieceChange(e)}>
                        <option value={"rook"}>Rook</option>
                        <option value={"queen"}>Queen</option>
                        <option value={"knight"}>Knight</option>
                    </select></li>
                </ul>
                <Link to={{pathname: "/chessboard/" + queryString.stringify(this.state)}}><button>Play</button></Link>
            </>
        );
    }
}

export default ChessboardMenu;