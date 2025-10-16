import styles from './timer.module.css';

export default function ToggleSwitch(props) {
    return (
        <div
            className={`${styles.autoStartSection} ${
                !props.timerAuto ? styles.disabled : ""
            }`}
        >
            <div className={styles.toggleSwitch}>
                <label>
                    Auto Start Next Timer
                    <input
                        type="checkbox"
                        checked={props.timerAuto}
                        onChange={() => props.setTimerAuto((prev) => !prev)}
                    />
                    <span className={styles.slider}></span>
                </label>
            </div>

            <div className={styles.inputGroup}>
                <label>Pomodoros until long break</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={props.pomosNeeded}
                    onChange={(e) => props.setPomosNeeded(Number(e.target.value))}
                    disabled={!props.timerAuto}
                />
            </div>
        </div>
    );
}
