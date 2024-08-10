"use client";
import styles from "./create.module.scss";
import Link from 'next/link';
import { useState } from "react";

export default function Create(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const url = "http://127.0.0.1:8082/profiles/create";
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const basicProfile = {
            "username" : username,
            "password" : password,
            "email" : email,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(basicProfile)
        });

        
    } 

    return(
        <div className = {styles.signUp}>
            <form onSubmit={handleSubmit} action="">
                <h1>Sign Up</h1>
                <div className = {styles.signUpComp}>
                    <input type = "email" placeholder = "Email Address" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className = {styles.signUpComp}>
                    <input type = "text" placeholder = "Username" onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className = {styles.signUpComp}>
                    <input type = "password" placeholder = "Password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <Link href="/login" passHref >
                    <span className = {styles.loginRedirect}>Already have an account?</span>
                </Link>
                <Link href="/login" passHref>
                    <button type ="submit" className = {styles.signUpButton}>
                        Sign up
                    </button>
                </Link>
            </form>
        </div>
    );
}