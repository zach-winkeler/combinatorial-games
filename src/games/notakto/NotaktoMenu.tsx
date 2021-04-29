import {Link} from "react-router-dom";
import React from "react";
import queryString from "query-string";

interface IProps {

}

interface IState {
    firstPlayer: string
}

class NotaktoMenu extends React.Component<IProps, IState> {
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
                <h3>Notakto:</h3>
                <ul>
                    <li>First player: <select onChange={(e) => this.handleFirstPlayerChange(e)}>
                        <option value={"human"}>You</option>
                        <option value={"bot"}>Bot</option>
                        <option value={"random"}>Random</option>
                    </select></li>
                </ul>
                <Link to={{pathname: "/notakto/" + queryString.stringify(this.state)}}><button>Play</button></Link>
            </>
        );
    }
}

export default NotaktoMenu;