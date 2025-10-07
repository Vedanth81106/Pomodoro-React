import playIconUrl from '../assets/playButton.svg';
import pauseIconUrl from '../assets/pauseButton.svg';
import resetIconUrl from '../assets/resetButton.svg';

export default function Controls(props){

    return(
        <div className="timer-controls">
                
                <button onClick={props.startTimer} className="control-btn" title="Play">
                    <img src={playIconUrl} alt="play"/>
                </button>

                <button onClick={props.stopTimer} className="control-btn" title="Pause">
                    <img src={pauseIconUrl} alt="pause"/>
                </button>

                <button onClick={props.resetTimer} className="control-btn" title="Reset">
                    <img src={resetIconUrl} alt="reset"/>
                </button>
            </div>
    )
}