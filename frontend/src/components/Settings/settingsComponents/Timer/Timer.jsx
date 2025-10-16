import { useRef } from "react";
import styles from './timer.module.css';
import ToggleSwitch from "./ToggleSwitch.jsx";

export default function Timer(props) {
    function handleChange(event, modeName) {
        const value = event.target.value;
        props.setLocalDuration(prevLocalDuration => ({
            ...prevLocalDuration,
            [modeName]: value
        }));
    }

    return (
        <div className={styles.settingsWindow}>
            <form>
                <div>
                    <div className={styles.inputGroup}>
                        <label>Pomodoro</label>
                        <input 
                            value={props.localDuration.pomo} 
                            onChange={(e) => handleChange(e, 'pomo')} 
                            type="number"
                            min="1" 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Short Break</label>
                        <input 
                            value={props.localDuration.short} 
                            onChange={(e) => handleChange(e, 'short')} 
                            type="number"
                            min="1" 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Long Break</label>
                        <input 
                            value={props.localDuration.long} 
                            onChange={(e) => handleChange(e, 'long')} 
                            type="number"
                            min="1" 
                        />
                    </div>
                </div>

                <ToggleSwitch 
                    timerAuto={props.timerAuto}
                    setTimerAuto={props.setTimerAuto}
                    setPomosNeeded={props.setPomosNeeded}
                    pomosNeeded={props.pomosNeeded}
                />
            </form>
        </div>
    );
}