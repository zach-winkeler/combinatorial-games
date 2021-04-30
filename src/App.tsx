import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import NimClient from './games/nim/NimClient';
import { NimProps } from './games/nim/NimClient';
import * as queryString from "query-string";
import NotaktoClient, {NotaktoProps} from "./games/notakto/NotaktoClient";
import ChessboardClient, {ChessboardProps} from "./games/chessboard/ChessboardClient";
import KaylesClient, {KaylesProps} from "./games/kayles/KaylesClient";

class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path={"/nim/:opts"}
                        render={({ match }) => {
                            const nimProps = queryString.parse(match.params.opts, {arrayFormat: 'comma', parseNumbers: true, parseBooleans: true}) as unknown as NimProps;
                            return <NimClient {...  nimProps}/>;
                        }}
                    />
                    <Route
                        path={"/notakto/:opts"}
                        render={({ match }) => {
                            const notaktoProps = queryString.parse(match.params.opts) as unknown as NotaktoProps;
                            return <NotaktoClient {... notaktoProps}/>;
                        }}
                    />
                    <Route
                        path={"/chessboard/:opts"}
                        render={({ match }) => {
                            const chessboardProps = queryString.parse(match.params.opts) as unknown as ChessboardProps;
                            return <ChessboardClient {... chessboardProps}/>;
                        }}
                    />
                    <Route
                        path={"/kayles/:opts"}
                        render={({ match }) => {
                            const kaylesProps = queryString.parse(match.params.opts, {parseNumbers: true}) as unknown as KaylesProps;
                            return <KaylesClient {... kaylesProps}/>;
                        }}
                    />
                    <Route
                        path={"/"}
                        render={() => <Home />}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
