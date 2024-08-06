import styles from "./create.module.scss";
import Link from 'next/link';

export default function Create(){
    return(
        <div className = {styles.signUp}>
            <form action="">
                <h1>Sign Up</h1>
                <div className = {styles.signUpComp}>
                    <input type = "email" placeholder = "Email Address" required/>
                </div>
                <div className = {styles.signUpComp}>
                    <input type = "text" placeholder = "Username" required/>
                </div>
                <div className = {styles.signUpComp}>
                    <input type = "password" placeholder = "Password" required/>
                </div>
                <Link href="/login" passHref>
                    <button type = "button" className = {styles.signUpButton}>
                        Sign up
                    </button>
                </Link>
            </form>
        </div>
    );
}