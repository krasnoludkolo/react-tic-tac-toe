const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function getWinningRow(squares:Array<string>):Array<number> | null {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c]
        }
    }
    return null
}

export function isWinner(squares:Array<string>) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function notNullsInArray(squares:Array<string>) {
    return !Array.from(squares).some((element) => element === null);
}

export function isDraw(squares:Array<string>) {
    return notNullsInArray(squares)
}