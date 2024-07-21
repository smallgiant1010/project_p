import Link from "next/link";
import Logo from "./logo.png";
import styles from "./main.module.scss";
import Image from "next/image";
import Profile from "./account.png"

export default function Navbar() {
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
                        SEARCH
                    </Link>
                </button>
                <button className={styles.content_pages_button}>
                    <Link href="/history" className={styles.content_pages_name}>
                        HISTORY
                    </Link>
                </button>
                <button className={styles.profile_button}>
                    <span className={styles.content_pages_name}>
                        SIGN IN
                    </span>
                    <Image
                        src={Profile}
                        alt={"Profile Picture"}
                        width={75}
                        height={75}
                        quality={100}
                        priority
                    />
                </button>
            </div>
        </nav>
    );
}
