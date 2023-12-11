function Button(props){
    return(
        <div className = 'button-container'>
            <button
            onClick = {props.whenClicked}
            className="button">{props.tenzies ? 'Reset' : 'Roll'}</button>
        </div>
    )
}

export default Button