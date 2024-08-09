"use client";
import styles from "./login.module.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const params = new URLSearchParams({
        inputPassword: password,
    }).toString()
    const url = `http://127.0.0.1:8082/profiles/${username}?${params}`;
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Bad Request");
        }
        const data = await response.json()
        console.log('Response data: ', data)
        const write = await fetch('api/writeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (write.ok) {
            const result = write.json();
            console.log(result.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} action="">
                <h1>Login</h1>
                <div className={styles.loginComp}>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles.loginComp}>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className={styles.icon} />
                </div>
                <div className={styles.forgotPass}>
                    <label><input type="checkbox" />Remember Me</label>
                    <a href="#"> </a>
                </div>
                <Link href="login/create" className={styles.createAccount}>
                    <span>Don't have an account?</span>
                </Link>
                <button type="submit">Login</button>
            </form>
        </div>

    );
}