

function Dice (props) {

    //isHeld property is used to change the color of the dice
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div 
        className="dice"
        onClick = {props.holdDice} 
        style = {styles}>{props.diceValue}</div>
    )
}

export default Dice