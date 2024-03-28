import styles from '@/app/dashboard/page.module.css';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <>
            <div className={styles.welcomeDiv}>
                <h1>
                    👋
                </h1>
            </div>

            <section className={styles.detailSection}>
                <div className={styles.headline}>
                    <div className={styles.titleDiv}>
                        <h1>Your Categories</h1>
                    </div>
                    {/* <div className={styles.openDiv}>
                        <Link href="/dashboard/categories" className={styles.newLink}>
                            Create New
                        </Link>
                    </div> */}
                </div>
            </section>
        </>
    );
}