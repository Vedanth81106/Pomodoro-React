import downArrowUrl from '../assets/downArrow.svg';

export default function DropDown(props){

    function formatDropdown(input){

        switch(input){

            case "pomo": 
                return "Pomodoro"
            
            case "short" :
                return "Short Break"

            case "long" :
                return "Long Break"
        }
    }

    return(
        <div className="dropdown-wrapper">
            <div className="selected-option" onClick={() => props.toggleDropdown()}>
                {formatDropdown(props.mode)}
                <img src = {downArrowUrl}/>
            </div>
            {props.dropdownState && 
                <div className="options-container">
                    <button onClick={() => { props.changeMode("pomo"); props.toggleDropdown() }} className="option">Pomodoro</button>
                    <button onClick={() => { props.changeMode("short"); props.toggleDropdown() }} className="option">Short Break</button>
                    <button onClick={() => { props.changeMode("long"); props.toggleDropdown() }} className="option">Long Break</button>
                </div>
            }
        </div>
    )
}