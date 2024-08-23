"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Login from "./components/Login";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function Home() {
  const { data: session } = useSession();
  const { data: users, isLoading, error } = useSWR("/api/users");

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h1>Ops! Something went wrong while trying to read the Data</h1>;
  }

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
