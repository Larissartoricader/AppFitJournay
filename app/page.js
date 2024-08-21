import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>FitJourney</h1>
      <Link href="./profile">
        <button>Profil</button>
      </Link>
    </>
  );
}
