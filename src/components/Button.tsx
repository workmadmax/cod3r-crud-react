interface ButtonProps {
    color: 'green'|'blue'|'red'
    className?: string
    children: any
    onClick?: (props) => void
}

export default function Button(props: ButtonProps) {

    const color = props.color ?? 'blue'

    return (
        <button onClick={props.onClick} className={`
            bg-gradient-to-r from-${color}-400 to-${color}-700
            text-white px-4 py-2 rounded-md
            ${props.className}
        `}>
            {props.children}
        </button>
    )
}