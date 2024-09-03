"use client";

import BackButton from "@/app/components/BackButton";
import WeightForm from "@/app/components/WeightForm";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import useSWR from "swr";

const DataPage = styled.div`
  position: relativ;
`;

export default function WeightSubmition() {
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
    <DataPage>
      <BackButton />
      {/* <h1>Insert Weight, {user.owner}</h1> */}
      <WeightForm />
    </DataPage>
  );
}
