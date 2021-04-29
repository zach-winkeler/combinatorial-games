import React from "react";
import NimMenu from "./games/nim/NimMenu";
import NotaktoMenu from "./games/notakto/NotaktoMenu";
import ChessboardMenu from "./games/chessboard/ChessboardMenu";

class Home extends React.Component {
    render() {
        return (
            <>
            <h1>Combinatorial Games</h1>
            <div className={"rectangle-container"}>
                <div className={"rectangle"}>
                    <NimMenu />
                </div>
                <div className={"rectangle"}>
                    <NotaktoMenu />
                </div>
                <div className={"rectangle"}>
                    <ChessboardMenu />
                </div>
            </div>
            </>
        );
    }
}

export default Home;