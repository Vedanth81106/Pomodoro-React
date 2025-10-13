import { useState, useEffect, useRef } from "react";
import { useTheme } from "./settingsComponents/Themes/ThemeContext.jsx";

import Timer from "./settingsComponents/Timer/Timer.jsx";
import Themes from "./settingsComponents/Themes/Themes.jsx";
import Account from "./settingsComponents/Account/Account.jsx"

import accountIconUrl from "../../assets/images/accountIcon.svg";
import galleryIconUrl from "../../assets/images/galleryIcon.svg";
import timerIconUrl from "../../assets/images/timerIcon.svg";

import styles from "./settingsStyles.module.css";

const DEFAULT_DURATIONS = { pomo: 25, short: 5, long: 15 };

export default function Settings(props) {
    const [currentContent, setCurrentContent] = useState("timers");
    const [localDuration, setLocalDuration] = useState(props.durations);
    const { theme, setTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState(theme);
    
    const settingsRef = useRef(null);

    function handleReset() {
        setLocalDuration(DEFAULT_DURATIONS);
        setLocalTheme("forest"); // Reset to default theme
        props.setTimerAuto(false);
        props.setPomosNeeded(3);
    }

    function handleSave(event) {
        event.preventDefault();
        props.setDuration(localDuration);
        setTheme(localTheme);
        props.toggleSettings();
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

    const contentMap = {
        timers: <Timer
                    localDuration={localDuration}
                    setLocalDuration={setLocalDuration}
                    timerAuto={props.timerAuto}
                    setTimerAuto={props.setTimerAuto}
                    setPomosNeeded={props.setPomosNeeded}
                    pomosNeeded={props.pomosNeeded}
                />,
        themes: <Themes 
                    localTheme={localTheme}
                    setLocalTheme={setLocalTheme}
                />,
        account: <Account />
    }

    return (
        <div className={styles.settingsContainer}>
            <div ref={settingsRef} className={styles.settingsWindow}>
                <div className={styles.sidebar}>
                    <button 
                        onClick={() => setCurrentContent("timers")} 
                        className={`${styles.menuIcons} ${currentContent === 'timers' ? styles.active : ''}`} 
                        title="Timers"
                    >
                        <img src={timerIconUrl} alt="Timers" />
                    </button>

                    <button 
                        onClick={() => setCurrentContent("themes")} 
                        className={`${styles.menuIcons} ${currentContent === 'themes' ? styles.active : ''}`} 
                        title="Themes"
                    >
                        <img src={galleryIconUrl} alt="Themes" />
                    </button>

                    <button 
                        onClick={() => setCurrentContent("account")} 
                        className={`${styles.menuIcons} ${currentContent === 'account' ? styles.active : ''}`} 
                        title="Account"
                    >
                        <img src={accountIconUrl} alt="Account" />
                    </button>

                </div>

                <div className={styles.menuContent}>
                    {contentMap[currentContent]}
                </div>

                <div className={styles.settingsButtons}>
                        <button type="button" onClick={handleSave}>Save Changes</button>
                        <button type="button" onClick={props.toggleSettings}>Close</button>
                        <button type="button" onClick={handleReset}>Reset</button>
                    </div>
            </div>
        </div>
    );
}

