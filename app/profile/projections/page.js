"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";
import BackButton from "@/app/components/BackButton";
import styled from "styled-components";
import DaysCalculator from "@/app/components/DaysCalculator";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(userId ? `/api/users/${userId}` : null);

  if (isLoading) {
    return <h2>Loading user data...</h2>;
  }

  if (error) {
    return <h1>Oops! Something went wrong while trying to fetch user data.</h1>;
  }

  if (!user) {
    return <h2>No user data available.</h2>;
  }

  return (
    <ProjectionsPageStyled>
      <BackButton />
      <ProjectionseNameHeading>Projections</ProjectionseNameHeading>

      <h2>Hello, {user.owner}</h2>

      <h2>{user.projection}kg</h2>
      <DaysCalculator currentUser={user} />
    </ProjectionsPageStyled>
  );
}
