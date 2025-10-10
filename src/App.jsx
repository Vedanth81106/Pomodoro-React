    import { useState,useEffect,useRef } from "react";

    import Controls from "./components/Controls";
    import Clock from "./components/Clock";
    import DropDown from "./components/Dropdown";
    import Settings from "./components/Settings/Settings";

    import backgroundImage from './assets/images/background.jpg';
    import breakSoundUrl from './assets/audio/breakEndBell.mp3';
    import pomoSoundUrl from './assets/audio/pomoEndBell.mp3';

    export default function App(){

        const [timeLeft,setTimeLeft] = useState(25*60*1000);
        const [isRunning, setIsRunning] = useState(false);
        const [mode,setMode] = useState("pomo");
        const [dropdownState,setDropdownState] = useState(false);
        const [endTime,setEndTime] = useState(null);
        const [settingsMenu,setSettingsMenu] = useState(false);

        const durations = {pomo : 25, short: 5, long: 15};
        const [duration,setDuration] = useState(durations);

        const breakSoundRef = useRef(null);
        const pomoSoundRef = useRef(null);

        useEffect(() => {

            if(isRunning){
                const timer = setInterval(() =>  {

                        const newTimeLeft = endTime - Date.now();

                        if(newTimeLeft <= 0){
                            setIsRunning(false);
                            setTimeLeft(0);
                            showNotification();

                            mode === "pomo" ? pomoSoundRef.current.play() : breakSoundRef.current.play();
                        }else{
                            setTimeLeft(newTimeLeft);
                        }

                },1000);

                //only runs if isRunning becomes false.
                return () => clearInterval(timer);
            }
        },[isRunning, mode, endTime]);

        useEffect(() => {

            setIsRunning(false);
            setTimeLeft(duration[mode]*60*1000);            
        },[duration])

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

        },[isRunning])

        function showNotification(){

            const bodyText = mode === "pomo" ? "Time for a break!" : "Time to get back to work!"

            if(Notification.permission === 'granted'){
                return new Notification("Pomodoro",{body : bodyText});
            }
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

        function stopTimer(){

            if(isRunning){
                setIsRunning(false);
                setTimeLeft(endTime - Date.now());
            }
        }

        function resetTimer(){

            if(isRunning){
                setIsRunning(false);
            }
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

        const styles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
        };

        ////We use () => ... instead of {changeMode("pomo")} directly because the direct calling will make it so that REact renders it immediately when the component loads. Doing () => makes it such that it only loads when its needed later.

        return(
            <div style={styles} className="container">
                {!settingsMenu ? (
                <>  
                
                    <Controls startTimer = {startTimer} stopTimer = {stopTimer} resetTimer = {resetTimer} toggleSettings={toggleSettings}/>

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
                />
                )}
                <audio ref={breakSoundRef} src={breakSoundUrl} />
                <audio ref={pomoSoundRef} src={pomoSoundUrl} />

            </div>
        )
    }