"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Login from "./components/Login";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <h1>FitJourney</h1>
      <Login />
      {session && (
        <Link href="./profile">
          <button>Profil</button>
        </Link>
      )}
    </>
  );
}
