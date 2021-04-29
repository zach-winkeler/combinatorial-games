import {Link} from "react-router-dom";
import React from "react";
import queryString from "query-string";

interface IProps {

}

interface IState {
    firstPlayer: string,
    randomPiles: boolean,
    startingPiles?: number[],
    numPiles?: number,
    maxPileSize?: number
}

function parseListOfInt(s: String) {
    return s.split(',').map(s => parseInt(s));
}

class NimMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            firstPlayer: 'human',
            randomPiles: false,
            startingPiles: [1,2,3]
        };
    }

    handleFirstPlayerChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({firstPlayer: e.target.value})
    }

    handleRandomPilesClick() {
        this.setState({randomPiles: !this.state.randomPiles});
    }

    handleStartingPilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({startingPiles: parseListOfInt(e.target.value)});
    }

    handleNumPilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({numPiles: parseInt(e.target.value)});
    }

    handleMaxPileSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({maxPileSize: parseInt(e.target.value)});
    }

    render() {
        return (
            <>
                <h3>Nim:</h3>
                <ul>
                    <li>First player: <select onChange={(e) => this.handleFirstPlayerChange(e)}>
                        <option value={"human"}>You</option>
                        <option value={"bot"}>Bot</option>
                        <option value={"random"}>Random</option>
                    </select></li>
                    <li>Random piles:
                        <input type={"checkbox"} readOnly checked={this.state.randomPiles}
                               onClick={() => this.handleRandomPilesClick()}/>
                    </li>
                    <li>Starting piles: <input type={"text"} defaultValue={"1,2,3"} onChange={(e) => this.handleStartingPilesChange(e)} disabled={this.state.randomPiles} /></li>
                    <li>Number of piles: <input type={"number"} min={"0"} onChange={(e) => this.handleNumPilesChange(e)} disabled={!this.state.randomPiles}/></li>
                    <li>Max pile size: <input type={"number"} min={"0"} onChange={(e) => this.handleMaxPileSizeChange(e)} disabled={!this.state.randomPiles}/></li>
                </ul>
                <Link to={{pathname: "/nim/" + queryString.stringify(this.state, {arrayFormat: 'comma'})}}><button>Play</button></Link>
            </>
        );
    }
}

export default NimMenu;