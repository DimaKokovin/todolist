type ButtonProps = {
    title: string
    onClick?: () => void
    disabled?:boolean
    classes?:string
}

export const Button = (props:ButtonProps) => {
    return <button
        className={props.classes}
        onClick={props.onClick}
        disabled={props.disabled}
    > {props.title}</button>
}