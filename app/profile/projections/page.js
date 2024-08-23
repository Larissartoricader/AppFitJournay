"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import BackButton from "@/app/components/BackButton";

export default function projections() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(null);
  const { data: currentUser, error } = useSWR(
    email ? `/api/users/email?email=${encodeURIComponent(email)}` : null
  );

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You must be logged in to view this page.</p>;
  }

  if (error) {
    return <h1>Ops! Something went wrong while trying to read the Data</h1>;
  }
  return (
    <>
      <BackButton />
      <h1>Projections</h1>
      {currentUser ? <h1>{currentUser.owner}</h1> : <p>User not found</p>}
      {currentUser ? (
        <h1>{currentUser.projection}kg</h1>
      ) : (
        <p>User not found</p>
      )}
      <p></p>
    </>
  );
}
