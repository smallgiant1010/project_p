"use client";
import Link from "next/link";
import Logo from "./logo.png";
import styles from "./main.module.scss";
import Image from "next/image";
import Profile from "./account.png"
import { useEffect, useState } from "react";


export default function Navbar() {
    const [isDropDown, setDropDown] = useState(false);
    const [validation, setValidation] = useState(false);
    const [userInfo, setUserInfo] = useState("SIGN IN");
    const read = async() => {
        // const loginInfo = await fetch('api/readData', {
        //     method: 'GET',
        // });
        // const res = await loginInfo.json();
        // const check = 'username' in res;
        if (sessionStorage.getItem('username') !== null){
            setValidation(true);
            setUserInfo(sessionStorage.getItem('username'));
            console.log("work");

        }
        // setValidation(check);
        // if (check) {
        //     setUserInfo(sessionStorage.getItem('username'));
        // }
        else {
            setUserInfo("SIGN IN")
            console.log("not work");
        }
    }
    useEffect(() => {
        read();
        // console.log(validation)
    }
    , [validation]);

    const handleDropDown = () => {
        setDropDown(!isDropDown);
    }


    return (
        <nav className={styles.nav}>
            <div className={styles.home_redirect}>
                <button className={styles.home_button}>
                    <Link href="/" className={styles.website_name}>
                        <Image
                            src={Logo}
                            alt={"MXZ Logo"}
                            width={50}
                            height={50}
                            quality={100}
                            priority
                        />
                        NEXT MOBILE VENTURES
                    </Link>
                </button>
            </div>
            <div className={styles.content_pages}>
                <button className={styles.content_pages_button}>
                    <Link href="/credits" className={styles.content_pages_name}>
                        CREDITS
                    </Link>
                </button>
                <button className={styles.content_pages_button}>
                    <Link href="/history" className={styles.content_pages_name}>
                        HISTORY
                    </Link>
                </button>
                <button className={styles.content_pages_button}>
                    {validation ? (
                        <div>
                            <span className={styles.content_pages_name} onClick={handleDropDown}>
                                {userInfo}
                            </span>
                            {isDropDown && (
                                <div className={styles.dropDownMenu}>
                                    {/* <Link href="#" className={styles.dropDownItem}>
                                        Settings
                                    </Link> */}
                                    <button onClick={
                                        () => {
                                        sessionStorage.clear();
                                        setValidation(false);
                                        window.location.href = "/login";         
                                    }}className={styles.dropDownItem}>
                                        LOG OUT
                                    </button>
                                </div>
                            )}
                        </div>
                    ) :(
                        <Link href="/login" className={styles.content_pages_name}>
                            SIGN IN
                        </Link>
                    )}
                    {/* <span className={styles.content_pages_name}>
                        SIGN IN
                    </span> */}
                    {/* <Image
                        src={Profile}
                        alt={"Profile Picture"}
                        width={75}
                        height={75}
                        quality={100}
                        priority
                    /> */}
                </button>
            </div>
        </nav>
    );
}
