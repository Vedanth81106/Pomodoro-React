export default function Clock(props){
    
    const timeLeft = props.timeLeft;
    
    function formatTimer(){

        let totalSeconds = Math.round(timeLeft / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${minutes}:${seconds}`;
    }


    return(

        <div className="clock">
            {formatTimer()}
        </div>

    )
}