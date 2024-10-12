"use client";
import BackButton from "@/app/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import useSWR from "swr";

const FeelingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const feelingToEmoji = (feeling) => {
  switch (feeling.toLowerCase()) {
    case "happy":
      return (
        <Image
          src="https://media.giphy.com/media/azaMjwRFm0vjNSd51t/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "unhappy":
      return (
        <Image
          src="https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "joyful":
      return (
        <Image
          src="https://media.giphy.com/media/cklPOHnHepdwBLRnQp/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "content":
      return (
        <Image
          src="https://media.giphy.com/media/aQYR1p8saOQla/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "indifferent":
      return (
        <Image
          src="https://media.giphy.com/media/G5X63GrrLjjVK/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "anxious":
      return (
        <Image
          src="https://media.giphy.com/media/dkgZ1hG1kUK0A7UNeS/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "sad":
      return (
        <Image
          src="https://media.giphy.com/media/UDD1PWeNwS1Co/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    case "frustrated":
      return (
        <Image
          src="https://media.giphy.com/media/YVvTCqTBglkOs/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
    default:
      return (
        <Image
          src="https://media.giphy.com/media/1AiMSH9YNZORvdbYEw/giphy.gif"
          alt="Happy"
          width="200"
          height="300"
        />
      );
  }
};

export default function ImpressionsPage() {
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
  const countFeelings = (entries) => {
    const feelingCounts = {};

    entries.forEach((entry) => {
      const feeling = entry.feeling.toLowerCase();
      if (feelingCounts[feeling]) {
        feelingCounts[feeling]++;
      } else {
        feelingCounts[feeling] = 1;
      }
    });

    return feelingCounts;
  };

  const getMostFrequentFeeling = (feelingCounts) => {
    let mostFrequentFeeling = null;
    let maxCount = 0;

    for (const [feeling, count] of Object.entries(feelingCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentFeeling = feeling;
      }
    }

    return mostFrequentFeeling;
  };

  const feelingCounts = countFeelings(userEntries);
  const mostFrequentFeeling = getMostFrequentFeeling(feelingCounts);

  return (
    <>
      <BackButton />
      <h2>Impressions</h2>
      {userEntries.length === 0 ? (
        <h2>
          You have not yet shared any information with us.{" "}
          <Link href={`/profile/data?userId=${userId}`}>Click here</Link> to
          enter your information.
        </h2>
      ) : (
        <FeelingBox>
          {mostFrequentFeeling && (
            <>
              <h3>Most Frequent Feeling</h3>
              <p>Here you can see how you felt along the way.</p>
              <p>{feelingToEmoji(mostFrequentFeeling)}</p>
              <p>{mostFrequentFeeling}</p>
            </>
          )}
        </FeelingBox>
      )}
    </>
  );
}
