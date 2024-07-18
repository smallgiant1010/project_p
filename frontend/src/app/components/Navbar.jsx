import Link from "next/link";
import Logo from "./logo.png";
import styles from "./components.module.scss";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.logoSection}>
                <button className={styles.logoButton}>
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt={"MXZ Logo"}
                            width={75}
                            height={75}
                            quality={100}
                            priority
                        />
                    </Link>
                </button>
            </div>
        </nav>
    );
}
