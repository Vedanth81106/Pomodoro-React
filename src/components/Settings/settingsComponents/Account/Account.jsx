import { useState } from "react";
import styles from "./account.module.css";

export default function Account(props){

    const [activeTab, setActiveTab] = useState("login");
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [nickName, setNickName] = useState('');
    const [errors,setErrors] = useState({});

    function handleSubmit(event){
        event.preventDefault();
        if(confirmPwd != pwd){
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPwd: "Passwords do not match!!"
            }))

            return;
        }

        setErrors(prevErrors => ({...prevErrors,confirmPwd: null}));
    }

    function handleTabChange(tabName){
        setActiveTab(tabName);
        setEmail('')
        setPwd('')
        setNickName('')
        setErrors({})
    }

    return(

        <div>
            <div className={styles.tabGroup}>
                <button onClick={() => handleTabChange("login") }>Login</button>
                <button onClick={() => handleTabChange("signUp")}>Sign up</button>
            </div>
            
            {activeTab === 'login' && 
                <form className={styles.accountForm} onSubmit={handleSubmit}>
                    
                    <div className={styles.inputField}>
                        <label>Email: </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputField}>
                        <label>Password: </label>
                        <input 
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>

                    <button type="submit">Login</button>

                </form>
            }
            {activeTab === 'signUp' && 
                <form className={styles.accountForm} onSubmit={handleSubmit}>
                
                    <div className={styles.inputField}>
                        <label>Email: </label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputField}>
                        <label>Password: </label>
                        <input 
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputField}>
                        <label>Confirm Password: </label>
                        <input 
                            type="password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                        {errors.confirmPwd && <p className={styles.errorMessage}>{errors.confirmPwd}</p>}
                    </div>

                    <div className={styles.inputField}>
                        <label>Nickname: </label>
                        <input 
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>

                    <button type="submit">Sign Up</button>

                </form>
            }
        </div>
    )
}