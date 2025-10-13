import { createContext, useContext, useState, useEffect } from "react";

import forestBg from '../../../../assets/images/backgrounds/forest.jpg';
import oceanBg from '../../../../assets/images/backgrounds/ocean.jpg';
import neonBg from '../../../../assets/images/backgrounds/neon.jpg';
import flowersBg from '../../../../assets/images/backgrounds/flowers.jpg';

const ThemeContext = createContext();

export function ThemeProvider({ children }){

    

    const themes = {
        forest: {
            background: `url(${forestBg}) center/cover fixed no-repeat`,
            "--text-color": "#b5c99a",
            "--accent-color": "#b5c99a",
            "--option-hover-bg": "rgba(255, 255, 255, 0.1)",
            "--option-hover-color": "#dcedc8",
            "--button-bg": "rgba(255, 255, 255, 0.1)",
            "--button-hover-bg": "rgba(255, 255, 255, 0.2)",
            "--dropdown-bg": "rgba(20, 20, 20, 0.5)",
            "--selected-bg": "rgba(255, 255, 255, 0.05)",
            "--selected-hover-bg": "rgba(255, 255, 255, 0.15)",
        },
        ocean: {
            background: `url(${oceanBg}) center/cover fixed no-repeat`,
            "--text-color": "#E0F7FA",
            "--accent-color": "#80DEEA",
            "--option-hover-bg": "rgba(224, 247, 250, 0.15)",
            "--option-hover-color": "#B2EBF2",
            "--button-bg": "rgba(14, 125, 129, 0.66)",
            "--button-hover-bg": "rgba(0, 96, 100, 0.5)",
            "--dropdown-bg": "rgba(0, 57, 60, 0.6)",
            "--selected-bg": "rgba(0, 96, 100, 0.2)",
            "--selected-hover-bg": "rgba(0, 96, 100, 0.4)",
        },
        neon: {
            background: `url(${neonBg}) center/cover fixed no-repeat`,
            "--text-color": "#b404faff",
            "--accent-color": "#4FC3F7",
            "--option-hover-bg": "rgba(79, 195, 247, 0.15)",
            "--option-hover-color": "#81D4FA",
            "--button-bg": "rgba(230, 130, 163, 0.53)",
            "--button-hover-bg": "rgba(211, 86, 127, 0.98)",
            "--dropdown-bg": "rgba(20, 0, 30, 0.6)",
            "--selected-bg": "rgba(79, 195, 247, 0.1)",
            "--selected-hover-bg": "rgba(79, 195, 247, 0.25)",
        },
        flowers: {
            background: `url(${flowersBg}) center/cover fixed no-repeat`,
            "--text-color": "#fffdffff",
            "--accent-color": "#CE93D8",
            "--option-hover-bg": "rgba(206, 147, 216, 0.15)",
            "--option-hover-color": "#E1BEE7",
            "--button-bg": "rgba(118, 55, 128, 0.3)",
            "--button-hover-bg": "rgba(118, 55, 128, 0.5)",
            "--dropdown-bg": "rgba(69, 39, 75, 0.6)",
            "--selected-bg": "rgba(118, 55, 128, 0.2)",
            "--selected-hover-bg": "rgba(118, 55, 128, 0.4)",
        },
    };

    const [theme, setTheme] = useState("forest");

    useEffect(() => {
        const selected = themes[theme];
        
        for(const key in selected){
            if(key === "background"){
                document.body.style.background = selected[key];
            } else {
                document.body.style.setProperty(key, selected[key]);
            }
        }
    },[theme]);

    // Inside ThemeContext.jsx

useEffect(() => {
    const selected = themes[theme];
    
    for(const key in selected){
        // ADD THIS LINE to see what's being applied
        console.log(`Applying style -> ${key}: ${selected[key]}`); 
        
        if(key === "background"){
            document.body.style.background = selected[key];
        } else {
            document.body.style.setProperty(key, selected[key]);
        }
    }
},[theme]);

    return(
        <ThemeContext.Provider value = {{theme, setTheme, themes}}>
            {children}
        </ThemeContext.Provider>
    )
}



export function useTheme() {
  return useContext(ThemeContext);
}

