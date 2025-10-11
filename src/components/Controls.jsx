import playIconUrl from '../assets/images/playButton.svg';
import pauseIconUrl from '../assets/images/pauseButton.svg';
import resetIconUrl from '../assets/images/resetButton.svg';
import settingsIconUrl from '../assets/images/settingsIcon.svg'

export default function Controls(props){

    return(
        <div className="timer-controls">
                
                <button onClick={props.startTimer} className="control-btn" title="Play">
                    <img src={playIconUrl} alt="play"/>
                </button>

                <button onClick={props.pauseTimer} className="control-btn" title="Pause">
                    <img src={pauseIconUrl} alt="pause"/>
                </button>

                <button onClick={props.resetTimer} className="control-btn" title="Reset">
                    <img src={resetIconUrl} alt="reset"/>
                </button>

                <button onClick={props.toggleSettings} className="control-btn" title="Settings">
                    <img src={settingsIconUrl} alt="settings"/>
                </button>
            </div>
    )
}