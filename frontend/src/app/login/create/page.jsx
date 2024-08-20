"use client";
import styles from "./create.module.scss";
import Link from 'next/link';
import { useState } from "react";

export default function Create(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const url = "https://next-mobile-ventures-backend.onrender.com/profiles/create";
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true)
        try {
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

            if(response.status !== 200) {
                console.log(response.text);
            }
        }
        catch(err) { 
            console.log(err)
        }
        finally {
            window.location.href = "/login";
            setLoading(false)
        }
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
                    <input type = "password" placeholder = "Password" minlength = "8"  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <Link href="/login" passHref >
                    <span className = {styles.loginRedirect}>Already have an account?</span>
                </Link>
                <button type ="submit" className = {styles.signUpButton}>
                    {loading && <span>Signing Up</span>}
                    {!loading && <span>Sign Up</span>}
                </button>
            </form>
        </div>
    );
}