import { useState, useEffect, useRef } from "react";
import styles from './settingsStyles.module.css';
import ToggleSwitch from "./ToggleSwitch";

const DEFAULT_DURATIONS = { pomo: 25, short: 5, long: 15 };

export default function Settings(props) {
    const [localDuration, setLocalDuration] = useState(props.durations);
    const settingsRef = useRef(null);

    function handleSave(event) {
        event.preventDefault();
        props.setDuration(localDuration);
        props.toggleSettings();
    }

    function handleChange(event, modeName) {
        const value = event.target.value;
        setLocalDuration(prevLocalDuration => ({
            ...prevLocalDuration,
            [modeName]: value
        }));
    }

    function handleReset() {
        setLocalDuration(DEFAULT_DURATIONS);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                props.toggleSettings();
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                props.toggleSettings();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [props.toggleSettings]);

    return (
        <div ref={settingsRef} className={styles.settingsWindow}>
            <form onSubmit={handleSave}>
                <div>
                    <div className={styles.inputGroup}>
                        <label>Pomodoro</label>
                        <input 
                            value={localDuration.pomo} 
                            onChange={(e) => handleChange(e, 'pomo')} 
                            type="number"
                            min="1" 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Short Break</label>
                        <input 
                            value={localDuration.short} 
                            onChange={(e) => handleChange(e, 'short')} 
                            type="number"
                            min="1" 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Long Break</label>
                        <input 
                            value={localDuration.long} 
                            onChange={(e) => handleChange(e, 'long')} 
                            type="number"
                            min="1" 
                        />
                    </div>
                </div>

                <ToggleSwitch 

                    setPomosDone ={props.setPomosDone}
                    timerAuto={props.timerAuto}
                    setTimerAuto={props.setTimerAuto}
                    setPomosNeeded={props.setPomosNeeded}
                    pomosNeeded={props.pomosNeeded}
                />

                <div className={styles.settingsButtons}>
                    <button type="button" onClick={handleSave}>Save Changes</button>
                    <button type="button" onClick={props.toggleSettings}>Close</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}