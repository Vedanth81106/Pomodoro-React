import { useState, useEffect, useRef,useCallback } from "react";
import { ThemeProvider } from "./components/Settings/settingsComponents/Themes/ThemeContext";

import Controls from "./components/Controls";
import Clock from "./components/Clock";
import DropDown from "./components/Dropdown";
import Settings from "./components/Settings/Settings";

import breakSoundUrl from './assets/audio/breakEndBell.mp3';
import pomoSoundUrl from './assets/audio/pomoEndBell.mp3';

const DEFAULT_DURATIONS = { pomo: 25, short: 5, long: 15 };

export default function App() {
    const [timeLeft, setTimeLeft] = useState(25 * 60 * 1000);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("pomo");
    const [dropdownState, setDropdownState] = useState(false);
    const [endTime, setEndTime] = useState(null);
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [timerAuto, setTimerAuto] = useState(false);
    const [pomosNeeded, setPomosNeeded] = useState(3);
    const [pomosDone, setPomosDone] = useState(0);
    const [duration, setDuration] = useState(DEFAULT_DURATIONS);

    const breakSoundRef = useRef(null);
    const pomoSoundRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => handleTimer(), 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning, endTime, mode, pomosDone, timerAuto, duration, pomosNeeded]);

    useEffect(() => {
        setIsRunning(false);
        setTimeLeft(duration[mode] * 60 * 1000);
    }, [duration, mode]);

    useEffect(() => {
        window.addEventListener("keydown", spacebarEventListener);
        return () => window.removeEventListener("keydown", spacebarEventListener);
    }, []);

    function spacebarEventListener(event) {
        if (event.code === "Space") {
            event.preventDefault();
            setIsRunning((prev) => !prev);
        }
    }

    function handleTimer() {
        const newTimeLeft = endTime - Date.now();
        
        if (newTimeLeft <= 0) {
            showNotification();
            setTimeLeft(duration[mode]*60*1000);
            mode === "pomo" ? pomoSoundRef.current?.play() : breakSoundRef.current?.play();

            if (!timerAuto) {
                resetTimer();
            } else {
                handleAutoTransition();
            }
        } else {
            setTimeLeft(newTimeLeft);
        }
    }

    function handleAutoTransition() {
        if (mode === "pomo") {
            const newPomosDone = pomosDone + 1;
            
            if (newPomosDone >= pomosNeeded) {
                // Time for long break - reset counter
                setPomosDone(0);
                changeMode("long");
                setEndTime(Date.now() + duration.long * 60 * 1000);
            } else {
                // Time for short break - keep counting
                setPomosDone(newPomosDone);
                changeMode("short");
                setEndTime(Date.now() + duration.short * 60 * 1000);
            }
        } else {
            // After any break (short or long), go back to pomo
            changeMode("pomo");
            setEndTime(Date.now() + duration.pomo * 60 * 1000);
        }
    }

    function showNotification() {
        if (Notification.permission !== "granted") return;
        const bodyText = mode === "pomo" ? "Time for a break!" : "Time to get back to work!";
        new Notification("Pomodoro", { body: bodyText });
    }

    function startTimer() {
        if (!isRunning) {
            setIsRunning(true);
            setEndTime(Date.now() + timeLeft);
        }
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }
    }

    function pauseTimer() {
        if (isRunning) {
            setIsRunning(false);
            setTimeLeft(endTime - Date.now());
        }
    }

    function resetTimer() {
        setIsRunning(false);
        changeMode(mode);
    }

    function changeMode(input) {
        setMode(input);
        setTimeLeft(duration[input] * 60 * 1000);
    }

    function toggleDropdown() {
        setDropdownState((prev) => !prev);
    }

    const toggleSettings = useCallback(() => {
        setSettingsMenu((prev) => !prev);
    },[]) // Empty dependency array means it will never be recreated.

    return (
        <ThemeProvider>
            <div className="container">
                {!settingsMenu ? (
                    <>
                        <Controls
                            startTimer={startTimer}
                            pauseTimer={pauseTimer}
                            resetTimer={resetTimer}
                            toggleSettings={toggleSettings}
                        />
                        <Clock timeLeft={timeLeft} />
                        <DropDown
                            toggleDropdown={toggleDropdown}
                            mode={mode}
                            changeMode={changeMode}
                            dropdownState={dropdownState}
                        />
                    </>
                ) : (
                    <Settings
                        durations={duration}
                        toggleSettings={toggleSettings}
                        setDuration={setDuration}
                        timerAuto={timerAuto}
                        setTimerAuto={setTimerAuto}
                        pomosNeeded={pomosNeeded}
                        setPomosNeeded={setPomosNeeded}
                    />
                )}
                <audio ref={breakSoundRef} src={breakSoundUrl} />
                <audio ref={pomoSoundRef} src={pomoSoundUrl} />
            </div>
        </ThemeProvider>
    );
}