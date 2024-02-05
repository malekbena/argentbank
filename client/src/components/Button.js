const Button = ({ text, className, click }) => {
    return (
        <button className={`custom-button ${className}`} onClick={click}>{text}</button>
    )
}

export default Button