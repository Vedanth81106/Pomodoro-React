import { useState, useEffect, useRef } from "react";
import styles from './settingsStyles.module.css';

export default function Settings(props){

    const [localDuration, setLocalDuration] = useState(props.durations);

    const settingsClick = useRef(null);

    function handleSave(event){
        event.preventDefault(); // Prevent form submission
        props.setDuration(localDuration); // Fixed: was setDurations
        props.toggleSettings();
    }

    function handleChange(event, modeName) {
        const value = event.target.value;
        setLocalDuration(prevLocalDuration => ({
            ...prevLocalDuration,
            [modeName]: value
        }));
    }

    useEffect(() => {

        function handleClickOutside(event){
            if(settingsClick.current && !settingsClick.current.contains(event.target)){
                props.toggleSettings();
            }
        }

        function handleEscape(event){

            if(event.key === "Escape") props.toggleSettings();
        }

        document.addEventListener("mousedown",handleClickOutside);
        document.addEventListener("keydown",handleEscape);

        return() =>{ 
            document.removeEventListener("mousedown",handleClickOutside);
            document.removeEventListener("keydown",handleEscape);
        }
    },[])

    return(
        <div ref={settingsClick} className={styles.settingsWindow}>
            <form>
                <div>

                    <div className={styles.inputGroup}>
                        <label>Pomodoro</label>
                        <input value={localDuration.pomo} onChange={(e) => handleChange(e, 'pomo')} type="number" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Short Break</label>
                        <input value={localDuration.short} onChange={(e) => handleChange(e, 'short')} type="number" />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Long Break</label>
                        <input value={localDuration.long} onChange={(e) => handleChange(e, 'long')} type="number" />
                    </div>

                </div>

                <div className={styles.settingsButtons}>
                    <button type="button" onClick={handleSave}>Save Changes</button>
                    <button type="button" onClick={props.toggleSettings}>Close</button>
                    <button type="button" onClick={() => {setLocalDuration(props.durations)}}>Reset</button>
                </div>
            </form>
        </div>
    );
}