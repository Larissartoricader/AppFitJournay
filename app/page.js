"use client";

import styles from "./page.module.css";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import LogInPage from "./components/LogInPage";
import LogOutPage from "./components/LogOutPage";
import CreateProfile from "./components/CreateProfile";

const StyledHomePage = styled.div``;

export default function Home() {
  const { data: session, status } = useSession();
  const { data: users, isLoading, error } = useSWR("/api/users");

  if (status === "loading" || isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h1>Ops! Something went wrong while trying to read the Data</h1>;
  }

  const userExists =
    session?.user?.email &&
    users?.some(
      (user) =>
        Array.isArray(user.email) && user.email.includes(session.user.email)
    );

  const currentUser = users?.find(
    (user) =>
      Array.isArray(user.email) && user.email.includes(session?.user?.email)
  );

  const currentUserId = currentUser ? currentUser._id : null;

  // console.log("Session data:", session);
  // console.log("Users data:", users);
  // console.log("User exists:", userExists);
  // console.log("Current User Object:", currentUser);
  // console.log("Current User ID:", currentUserId);

  return (
    <StyledHomePage>
      <h1>FitJourney</h1>
      {!session ? (
        <LogInPage />
      ) : userExists ? (
        <LogOutPage currentUserId={currentUserId} currentUser={currentUser} />
      ) : (
        <CreateProfile />
      )}
    </StyledHomePage>
  );
}
