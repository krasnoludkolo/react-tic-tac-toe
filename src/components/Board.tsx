import Square from "./Square";
import React from "react";

require("react")

interface BoardProps {
    winningRow: Array<number> | null
    squares: Array<string>
    onClick: (i: number) => void
}

export default class Board extends React.Component<BoardProps, {}> {

    renderSquare(i: number) {
        const winning = new Set(this.props.winningRow).has(i)

        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            winning={winning}
        />;
    }


    generateRow(rowIndex: number) {
        return <div key={rowIndex} className="board-row">
            {
                Array(3).fill(0)
                    .map((_, col) => {
                        return this.renderSquare(rowIndex * 3 + col)
                    })
            }
        </div>
    }

    generateBoard() {
        return Array(3).fill(0)
            .map((_, row) => {
                    return this.generateRow(row);
                }
            );
    }

    render() {
        const board = this.generateBoard()
        return (
            <div>
                {board}
            </div>
        );
    }
}
