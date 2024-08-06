import Image from "next/image";
import styles from "./login.module.scss";
import { FaUser, FaLock } from "react-icons/fa";


export default function Login(){
    return(

        <div className= {styles.loginContainer}>
            <form action = "">
                <h1>Login</h1>
                <div className={styles.loginComp}>
                    <input type = "text" placeholder = "Username" required />
                    <FaUser className= {styles.icon}/>
                </div>
                <div className={styles.loginComp}>
                    <input type = "password" placeholder = "Password" required />
                    <FaLock className={styles.icon}/>
                </div>
                <div className={styles.forgotPass}>
                    <label><input type = "checkbox"  />Remember Me</label>
                    <a href = "#"> </a>
                </div>
                <div className = {styles.createAccount}>
                    <a href = "/create">Don't have an account?</a>
                </div>

                <button type = "submit">Login </button>
            </form>
        </div>

    );
}