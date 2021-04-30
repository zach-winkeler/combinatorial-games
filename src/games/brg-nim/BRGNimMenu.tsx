import {Link} from "react-router-dom";
import React from "react";
import queryString from "query-string";

interface IProps {

}

interface IState {
    firstPlayer: string,
    randomPiles: boolean,
    startingPiles?: string[],
    colors?: string[],
    numPiles?: number,
    maxPileSize?: number
}

class BRGNimMenu extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            firstPlayer: 'human',
            randomPiles: false,
            startingPiles: ['br','br','r']
        };
    }

    handleFirstPlayerChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({firstPlayer: e.target.value})
    }

    handleRandomPilesClick() {
        this.setState({randomPiles: !this.state.randomPiles});
    }

    handleStartingPilesChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({startingPiles: e.target.value.split(',')});
    }

    handleColorsChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({colors: [...e.target.options].filter(option => option.selected).map(option => option.value)});
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
                <h3>Blue-Red-Green Nim:</h3>
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
                    <li>Starting piles: <input type={"text"} defaultValue={"br,br,r"} onChange={(e) => this.handleStartingPilesChange(e)} disabled={this.state.randomPiles} /></li>
                    <li>Colors: <select multiple onChange={(e) => this.handleColorsChange(e)} disabled={!this.state.randomPiles}>
                        <option value={"b"}>Blue</option>
                        <option value={"r"}>Red</option>
                        <option value={"g"}>Green</option>
                    </select></li>
                    <li>Number of piles: <input type={"number"} min={"0"} onChange={(e) => this.handleNumPilesChange(e)} disabled={!this.state.randomPiles}/></li>
                    <li>Max pile size: <input type={"number"} min={"0"} onChange={(e) => this.handleMaxPileSizeChange(e)} disabled={!this.state.randomPiles}/></li>
                </ul>
                <Link to={{pathname: "/brg-nim/" + queryString.stringify(this.state, {arrayFormat: 'comma'})}}><button>Play</button></Link>
            </>
        );
    }
}

export default BRGNimMenu;