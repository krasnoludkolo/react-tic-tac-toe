import React from "react";
import {getWinningRow, isDraw, isWinner} from "./utils";
import Board from "./Board";


interface GameProps {

}

interface GameState {
    history: Array<Node>
    stepNumber: number
    normalOrder: boolean
    nodes: Record<number, Node>
    graph: Record<number, Array<number>>
    currentNodeId: number
}

interface Node {
    squares: Array<string>
    lastMove: number | null
    isXNext: boolean
}


export default class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        const initialState: Node = {
            squares: Array(9).fill(null),
            lastMove: null,
            isXNext: true
        };

        const states: Record<number, Node> = {
            0: initialState
        }
        this.state = {
            history: [initialState],
            stepNumber: 0,
            normalOrder: true,
            nodes: states,
            graph: {0: []},
            currentNodeId: 0
        }


    }

    getMaxId(graph: Record<number, any>): number {
        return Math.max(...(Object.keys(graph) as unknown as Array<number>))
    }

    existsInGraph(nextStates: Array<number>, move: number, states: Record<number, Node>): number | undefined {
        return nextStates.find((value) => {
            const nextState = states[value];
            return nextState.lastMove === move
        })
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = this.state.nodes[this.state.currentNodeId];
        const squares = current.squares.slice();
        if (isWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = current.isXNext ? "X" : "O";
        const newNode: Node = {
            squares: squares,
            lastMove: i,
            isXNext: !current.isXNext
        };

        const existsInGraph = this.existsInGraph(this.state.graph[this.state.currentNodeId], i, this.state.nodes)

        if (existsInGraph) {
            this.setState({
                history: history.concat([newNode]),
                stepNumber: history.length,
                currentNodeId: existsInGraph
            })
        } else {
            const maxId = this.getMaxId(this.state.graph);
            const newId = +maxId + +1
            const newGraph: Record<number, Array<number>> = this.state.graph
            newGraph[newId] = []
            newGraph[this.state.currentNodeId] = newGraph[this.state.currentNodeId].concat([newId])
            const newNodes: Record<number, Node> = this.state.nodes
            newNodes[newId] = newNode
            this.setState({
                history: history.concat([newNode]),
                stepNumber: history.length,
                currentNodeId: newId,
                graph: newGraph,
                nodes: newNodes
            })
        }

        console.log(this.state)

    }

    handleCheck() {
        this.setState({
                normalOrder: !this.state.normalOrder
            }
        )
    }

    jumpTo(step: number, moveId: number) {
        this.setState({
            stepNumber: step,
            currentNodeId: moveId
        })
    }


    getGameStatus(current: Node) {
        const winner = isWinner(current.squares)
        const draw = isDraw(current.squares)
        if (winner) {
            return 'Winner: ' + winner;
        } else {
            if (draw) {
                return 'Draw';
            } else {
                return 'Next player: ' + (current.isXNext ? 'X' : 'O');
            }
        }
    }

    mapIndexToCoordinates(i: number) {
        return [
            i % 3 + 1,
            Math.floor(i / 3) + 1
        ]
    }

    renderBeteList(children: Array<number>, nodeId: number, level: number = 0): Array<JSX.Element> {
        const node = this.state.nodes[nodeId]
        const desc = level ?
            'Go to move#' + nodeId + ' (' + this.mapIndexToCoordinates(node.lastMove!) + ')' :
            'Go to game start'
        const nodeButton = (
            <li key={nodeId} style={{marginLeft: 20 * level}}>
                <button
                    onClick={() => this.jumpTo(-1, nodeId)}
                >
                    {desc}
                </button>
            </li>
        )
        const childrenButtons: Array<JSX.Element> = children.map((id) => {
            return this.renderBeteList(this.state.graph[id], id, +level + 1)
        }).flat()
        return [nodeButton].concat(childrenButtons)
    }


    render() {
        const current = this.state.nodes[this.state.currentNodeId];
        const status = this.getGameStatus(current);
        const winningRow = getWinningRow(current.squares)
        const movesOld = (Object.keys(this.state.nodes) as unknown as Array<number>).map((nodeId, move) => {
            const node = this.state.nodes[nodeId]
            const desc = move ?
                'Go to move#' + nodeId + ' (' + this.mapIndexToCoordinates(node.lastMove!) + ')' :
                'Go to game start'
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move, nodeId)}
                        className={move === this.state.stepNumber ? "text-bold" : "text-normal"}
                    >
                        {desc}
                    </button>
                </li>
            )
        })

        const finalMoves = this.state.normalOrder ? movesOld : movesOld.reverse()

        const betaMoves = this.renderBeteList(this.state.graph[0], 0)

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winningRow={winningRow}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>

                <div className="game-info">
                    Normal order
                    <label className="switch">
                        <input type="checkbox" key="checkbox" checked={this.state.normalOrder}
                               onChange={() => this.handleCheck()}/>
                        <span className="slider round"></span>
                    </label>
                    <div>{status}</div>
                    <ul>{finalMoves}</ul>
                </div>
                <div className="game-info">
                    <div>Beta graph</div>
                    <ul>{betaMoves}</ul>
                </div>
            </div>
        );
    }
}