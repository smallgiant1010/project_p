"use client";
import styles from "./login.module.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { useState} from "react";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState(true);
    const params = new URLSearchParams({
        inputPassword: password,
    }).toString()
    const url = `http://127.0.0.1:8082/profiles/${username}?${params}`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Bad Request");
            }

            const data = await response.json();
            if ("Message" in data) {
                setValidation(false);
            }

            else {
                sessionStorage.setItem('u_id', data._id);
                sessionStorage.setItem('username', data.username);
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
            setValidation(false);
        } finally {
            setLoading(false);
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
                {!validation && <div>
                    Your Credentials are Incorrect.
                </div>}
                <button type="submit" disabled={loading}>
                    {loading && <span>Logging In...</span>}
                    {!loading && <span>Login</span>}
                </button>
            </form>
        </div>

    );
}