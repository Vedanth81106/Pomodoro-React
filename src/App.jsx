    import { useState,useEffect,useRef } from "react";

    import Controls from "./components/Controls";
    import Clock from "./components/Clock";
    import DropDown from "./components/Dropdown";
    import Settings from "./components/Settings/Settings";

    import backgroundImage from './assets/images/background.jpg';
    import breakSoundUrl from './assets/audio/breakEndBell.mp3';
    import pomoSoundUrl from './assets/audio/pomoEndBell.mp3';

    export default function App(){

        const styles = {
            background: `url(${backgroundImage}) center/cover fixed no-repeat`
            };

        const [timeLeft,setTimeLeft] = useState(25*60*1000);
        const [isRunning, setIsRunning] = useState(false);
        const [mode,setMode] = useState("pomo");
        const [dropdownState,setDropdownState] = useState(false);
        const [endTime,setEndTime] = useState(null);
        const [settingsMenu,setSettingsMenu] = useState(false);
        const [timerAuto,setTimerAuto] = useState(false);
        const [pomosNeeded,setPomosNeeded] = useState(3);
        const [pomosDone,setPomosDone] = useState(0);

        const durations = {pomo : 25, short: 5, long: 15};
        const [duration,setDuration] = useState(durations);

        const breakSoundRef = useRef(null);
        const pomoSoundRef = useRef(null);

        useEffect(() => {

            if(isRunning){
                const timer = setInterval(() =>  {

                        const newTimeLeft = endTime - Date.now();

                            if(newTimeLeft <= 0){
                                setTimeLeft(0);
                                showNotification();

                                mode === "pomo" ? pomoSoundRef.current.play() : breakSoundRef.current.play();

                                if(!timerAuto){
                                    setIsRunning(false);
                                }else{
                                    if(mode === "pomo"){
                                        const newPomosDone = pomosDone + 1;
                                        const nextMode = newPomosDone < pomosNeeded ? "short" : "long";

                                        changeMode(nextMode);
                                        setEndTime(Date.now() + duration[nextMode] * 60 * 1000)
                                    }else if(mode === "short"){
                                        setEndTime(Date.now() + duration['pomo'] * 60 * 1000)
                                    }else if(mode === "long"){
                                        changeMode("pomo");
                                        setPomosDone(0);
                                        setEndTime(Date.now() + duration['pomo'] * 60 * 1000)
                                    }
                                }
                            }else{
                                setTimeLeft(newTimeLeft);
                            }
                        
                },1000);

                //only runs if isRunning becomes false.
                return () => clearInterval(timer);
            }
        },[isRunning, mode, endTime, pomosDone, timerAuto, duration, pomosNeeded]);

        useEffect(() => {

            setIsRunning(false);
            setTimeLeft(duration[mode]*60*1000);            
        },[duration,mode])

        //spacebar pause/play

        function spacebarEventListener(event){

            if(event.code === 'Space'){
                    event.preventDefault();

                    if(isRunning){
                        setIsRunning(false);
                    }else{
                        setIsRunning(true);
                    }
            }
        }

        useEffect(() => {
            //You dont have to call a parameter because the browser will automatically call the function adn pass all the details of the event to it whenvere the event(pressing spacebar occurs)
            window.addEventListener('keydown',spacebarEventListener);
            return () => window.removeEventListener('keydown', spacebarEventListener);

        },[])

        function showNotification() {
            if (Notification.permission !== 'granted') return;
            const bodyText = mode === "pomo" ? "Time for a break!" : "Time to get back to work!";
            new Notification("Pomodoro", { body: bodyText });
            }

        function startTimer(){

            if(!isRunning){
                setIsRunning(true);
                setEndTime(Date.now() + timeLeft);
            }

            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }

        function pauseTimer(){

            if(isRunning){
                setIsRunning(false);
                setTimeLeft(endTime - Date.now());
            }
        }

        function resetTimer(){

            setIsRunning(false);
            changeMode(mode);       
        }

        function changeMode(input){
            
            setMode(input);
            setTimeLeft(duration[input]*60*1000);
        }

        function toggleDropdown(){

            setDropdownState(prevDropDownState => !prevDropDownState)
        }

        function toggleSettings(){

            setSettingsMenu(prevSettingsMenu => !prevSettingsMenu)
        }

        ////We use () => ... instead of {changeMode("pomo")} directly because the direct calling will make it so that REact renders it immediately when the component loads. Doing () => makes it such that it only loads when its needed later.

        return(
            <div style={styles} className="container">
                {!settingsMenu ? (
                <>  
                
                    <Controls startTimer = {startTimer} pauseTimer = {pauseTimer} resetTimer = {resetTimer} toggleSettings={toggleSettings}/>

                    <Clock timeLeft={timeLeft}/>

                    <DropDown 
                        toggleDropdown={toggleDropdown} 
                        mode={mode} 
                        changeMode={changeMode}
                        dropdownState={dropdownState}
                    />

                </>
                ): (
                <Settings 
                    durations = {duration} 
                    toggleSettings={toggleSettings}
                    setDuration = {setDuration}
                    timerAuto={timerAuto}
                    setTimerAuto={setTimerAuto}
                    pomosNeeded={pomosNeeded}
                    setPomosNeeded={setPomosNeeded}
                />
                )}
                <audio ref={breakSoundRef} src={breakSoundUrl} />
                <audio ref={pomoSoundRef} src={pomoSoundUrl} />

            </div>
        )
    }