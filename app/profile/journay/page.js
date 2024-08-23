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
  const chartData = {
    labels: people[2].entries.map((entry) => entry.date),
    datasets: [
      {
        label: "Weight",
        data: people[2].entries.map((entry) => entry.weight),
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
      <h1>Welcome to your Fit Journay, {people[2].email}</h1>

      <Line data={chartData} options={options} />
    </>
  );
}
