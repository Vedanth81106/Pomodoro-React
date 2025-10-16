import { useTheme } from "./ThemeContext";
import styles from "./themes.module.css";

export default function Themes(props) {
    const { themes } = useTheme();

    return (
        <div className={styles.themesContainer}>

            <button 
                onClick={() => props.setLocalTheme("forest")} 
                className={`${styles.themeButton} ${props.localTheme === "forest" ? styles.active : ""}`}
            >
                Forest
            </button>

            <button 
                onClick={() => props.setLocalTheme("ocean")} 
                className={`${styles.themeButton} ${props.localTheme === "ocean" ? styles.active : ""}`}
            >
                Ocean
            </button>

            <button 
                onClick={() => props.setLocalTheme("neon")} 
                className={`${styles.themeButton} ${props.localTheme === "neon" ? styles.active : ""}`}
            >
                Neon
            </button>

            <button 
                onClick={() => props.setLocalTheme("flowers")} 
                className={`${styles.themeButton} ${props.localTheme === "flowers" ? styles.active : ""}`}
            >
                Flowers
            </button>

            <button 
                onClick={() => props.setLocalTheme("sunset")} 
                className={`${styles.themeButton} ${props.localTheme === "sunset" ? styles.active : ""}`}
            >
                Sunset
            </button>

            <button 
                onClick={() => props.setLocalTheme("cats")} 
                className={`${styles.themeButton} ${props.localTheme === "cats" ? styles.active : ""}`}
            >
                Cats
            </button>

            <button 
                onClick={() => props.setLocalTheme("cars")} 
                className={`${styles.themeButton} ${props.localTheme === "cars" ? styles.active : ""}`}
            >
                Cars
            </button>

            <button 
                onClick={() => props.setLocalTheme("cosmos")} 
                className={`${styles.themeButton} ${props.localTheme === "cosmos" ? styles.active : ""}`}
            >
                Cosmos
            </button>
        </div>
    );
}