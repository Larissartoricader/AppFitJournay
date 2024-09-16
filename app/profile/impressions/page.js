"use client";
import BackButton from "@/app/components/BackButton";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

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
      return "🙁 Unhappy";
    case "joyful":
      return "🥳 Joyful";
    case "content":
      return "🙂 Content";
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
      return "😓 Anxious";
    case "sad":
      return "😢 Sad";
    case "frustrated":
      return "🙄 Frustrated";
    default:
      return "😶";
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
        <>
          <p>Here you can see how you felt along the way.</p>
          {mostFrequentFeeling && (
            <>
              <h3>Most Frequent Feeling</h3>
              <p>{feelingToEmoji(mostFrequentFeeling)}</p>
              <p>{mostFrequentFeeling}</p>
            </>
          )}
          {/* <h2>divisao</h2>
          {userEntries.map((entry) => (
            <>
              <p key={entry.id}>{feelingToEmoji(entry.feeling)}</p>
              <p key={entry.id}>{entry.feeling}</p>
            </>
          ))} */}
        </>
      )}
    </>
  );
}
