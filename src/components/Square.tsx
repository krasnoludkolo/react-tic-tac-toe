interface SquareProps {
    winning: boolean
    value: string
    onClick: () => void
}


export default function Square(props: SquareProps) {
    return (
        <button
            className={"square" + (props.winning ? " won-square" : "")}
            onClick={() => {
                props.onClick()
            }}
        >
            {props.value}
        </button>
    );
}