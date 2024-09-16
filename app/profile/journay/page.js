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
import Link from "next/link";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const feelingToEmoji = (feeling) => {
  switch (feeling.toLowerCase()) {
    case "happy":
      return "😃 Happy";
    case "unhappy":
      return "🙁 Unhappy";
    case "joyful":
      return "🥳 Joyful";
    case "content":
      return "🙂 Content";
    case "indifferent":
      return "😶 Indifferent";
    case "anxious":
      return "😓 Anxious";
    case "sad":
      return "😢 Sad";
    case "frustrated":
      return "🙄 Frustrated";
    default:
      return "😶";
  }
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 15px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

// export default function Journay() {
//   const searchParams = useSearchParams();
//   const userId = searchParams.get("userId");

//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useSWR(userId ? `/api/users/${userId}` : null);

//   if (isLoading) {
//     return <h2>Loading user data...</h2>;
//   }

//   if (error) {
//     return <h1>Oops! Something went wrong while trying to fetch user data.</h1>;
//   }

//   if (!user) {
//     return <h2>No user data available.</h2>;
//   }

//   const userEntries = user.entries;
//   const chartData = {
//     labels: user.entries.map((entry) => entry.date.split("T")[0]),
//     datasets: [
//       {
//         label: "Weight",
//         data: user.entries.map((entry) => ({
//           x: entry.date.split("T")[0],
//           y: entry.weight,
//           feeling: entry.feeling,
//         })),
//         backgroundColor: "rgba(75, 132, 122, 0.6)",
//         borderColor: "rgba(75, 132, 122, 1)",
//         fill: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Weight over Time",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const feelingEmoji = feelingToEmoji(context.raw.feeling);
//             return `${context.dataset.label}: ${context.raw.y} kg ${feelingEmoji}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <BackButton />
//       <h1>Welcome to your Fit Journey, {user.owner}</h1>
//       {userEntries.length === 0 ? (
//         <h3>
//           You have not yet shared any information with us so that we can set up
//           your journey.{" "}
//           <Link href={`/profile/data?userId=${userId}`}>Click here</Link> to
//           enter your information.
//         </h3>
//       ) : (
//         <h3>
//           Here is your journey based on all the data shared with us. Keep it up
//           to see your path step by step.{" "}
//         </h3>
//       )}

//       <Line data={chartData} options={options} />
//     </>
//   );
// }

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

  const userEntries = user.entries;
  const chartData = {
    labels: user.entries.map((entry) => entry.date.split("T")[0]),
    datasets: [
      {
        label: "Weight",
        data: user.entries.map((entry) => ({
          x: entry.date.split("T")[0],
          y: entry.weight,
          feeling: entry.feeling,
        })),
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
      tooltip: {
        callbacks: {
          label: function (context) {
            const feelingEmoji = feelingToEmoji(context.raw.feeling);
            return `${context.dataset.label}: ${context.raw.y} kg ${feelingEmoji}`;
          },
        },
      },
    },
  };

  return (
    <Container>
      <BackButton />
      <Heading>Welcome to your Fit Journey, {user.owner}</Heading>
      {userEntries.length === 0 ? (
        <SubHeading>
          You have not yet shared any information with us so that we can set up
          your journey.{" "}
          <Link href={`/profile/data?userId=${userId}`}>Click here</Link> to
          enter your information.
        </SubHeading>
      ) : (
        <SubHeading>
          Here is your journey based on all the data shared with us. Keep it up
          to see your path step by step.
        </SubHeading>
      )}

      <ChartWrapper>
        <Line data={chartData} options={options} />
      </ChartWrapper>
    </Container>
  );
}
