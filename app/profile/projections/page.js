"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import BackButton from "@/app/components/BackButton";
import styled from "styled-components";
import DaysCalculator from "@/app/components/DaysCalculator";

const ProjectionsPageStyled = styled.div`
  position: relative;
  padding: 20px 10px;
`;

const ProjectionseNameHeading = styled.h1`
  position: relative;
  margin-top: 50px;
  margin-left: 20px;
  font-size: 2rem;
`;

export default function Projections() {
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
    <ProjectionsPageStyled>
      <BackButton />
      <ProjectionseNameHeading>Projections</ProjectionseNameHeading>
      {currentUser ? (
        <h2>Hello, {currentUser.owner}</h2>
      ) : (
        <p>User not found</p>
      )}
      {currentUser ? (
        <h2>{currentUser.projection}kg</h2>
      ) : (
        <p>User not found</p>
      )}
      {/* {currentUser ? (
        <DaysCalculator currentUser={currentUser} />
      ) : (
        <p>User not found</p>
      )} */}
    </ProjectionsPageStyled>
  );
}
