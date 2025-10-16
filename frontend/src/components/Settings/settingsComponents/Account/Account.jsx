import { useState } from "react";
import styles from "./account.module.css";
import axios from 'axios';

export default function Account(props){

    const [activeTab, setActiveTab] = useState("login");
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [nickName, setNickName] = useState('');
    const [errors,setErrors] = useState({});
    const [formMessage, setFormMessage] = useState({type: '', text: ''});

    async function handleSubmit(event){
        event.preventDefault();

        if(activeTab == "signUp"){
            handleSignUp();
        }else if(activeTab == "login"){
            handleLogin();
        }

    }

    async function handleSignUp(){

        setErrors(prevErrors => ({...prevErrors,confirmPwd: null}));

        if(confirmPwd != pwd){
                setErrors(prevErrors => ({
                    ...prevErrors,
                    confirmPwd: "Passwords do not match!!"
                }))

                return;
            } 
            const user = {
                email :email,
                password: pwd,
                nickname: nickName,
            }

            try{

                const response = await axios.post('http://localhost:8080/api/users/signup',user);
                setFormMessage({type: 'success', text: 'Sign up successful!'});
                handleTabChange("login");
            }catch(error){
                    // Check if the error has a response from the server
                if (error.response) {
                    // This means the server responded with an error (e.g., "Email already in use")
                    setFormMessage({type: 'error', text:`Sign up failed ${error.response.data}`})
                } else {
                    // This means there was a network error (e.g., server is down)
                    setFormMessage({type: 'error', text:'Sign up failed could not connect to server.'})
                }
            }
    }

    async function handleLogin() {
        
        const credentials = {
            email : email,
            password : pwd
        };

        try{

            const response = await axios.post("http://localhost:8080/api/users/login", credentials);
            setFormMessage({type: 'success', text: `Welcome back, ${response.data.nickname}!`})

        }catch(error){
            if (error.response) {
                setFormMessage({type:'error', text:`Login failed ${error.response.data}`});
            } else {
                setFormMessage({type:'error', text:'Login failed Could not connect to the server.'});
            }
        }
    }

    function handleTabChange(tabName){
        setActiveTab(tabName);
        setEmail('')
        setPwd('')
        setNickName('')
        setErrors({})
        setFormMessage({ type: '', text: '' });
    }

    return(

        <div>
            <div className={styles.tabGroup}>

                <button className={activeTab === 'login' ? styles.active : '' }
                        onClick={() => handleTabChange("login") }>
                            Login
                </button>

                <button className={activeTab === 'signUp' ? styles.active : '' }
                        onClick={() => handleTabChange("signUp") }>
                            Sign Up
                </button>
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

                    {formMessage.text && (
                        <div className={`${styles.formMessage} ${styles[formMessage.type]}`}>
                            {formMessage.text}
                        </div>
                    )}

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

                        {pwd.length > 0 && pwd.length < 8 && (
                            <p className={styles.errorMessage}>Password must be at least 8 characters long!</p>
                        )}
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

                    {formMessage.text && (
                        <div className={`${styles.formMessage} ${styles[formMessage.type]}`}>
                            {formMessage.text}
                        </div>
                    )}

                    <button type="submit" disabled={pwd.length < 8 || confirmPwd !== pwd} >Sign Up</button>

                </form>
            }
        </div>
    )
}