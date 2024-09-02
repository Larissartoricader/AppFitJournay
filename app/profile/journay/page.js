"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { people } from "@/lib/dummydata";
import BackButton from "@/app/components/BackButton";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Journay() {
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

  const chartData = {
    labels: user.entries.map((entry) => entry.date),
    datasets: [
      {
        label: "Weight",
        data: user.entries.map((entry) => entry.weight),
        backgroundColor: "rgba(75, 132, 122, 0.6)",
        borderColor: "rgba(75, 132, 122, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weight over Time",
      },
    },
  };

  return (
    <>
      <BackButton />
      <h1>Welcome to your Fit Journay, {user.owner}</h1>

      <Line data={chartData} options={options} />
    </>
  );
}
