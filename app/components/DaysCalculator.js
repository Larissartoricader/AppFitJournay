import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-inline: 20px;
`;

const ProgressBarContainer = styled.div`
  width: 50%;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 64rem) {
    width: 70%;
  }

  @media screen and (max-width: 48rem) {
    width: 80%;
  }

  @media screen and (max-width: 32rem) {
    width: 100%;
  }
`;

const ProgressBarFill = styled(animated.div)`
  height: 48px;
  background-color: #4caf50;
  width: 0%;
  transition: width 0.5s ease-in-out;
`;

const PercentageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
`;

const StyledProjectionText = styled.p`
  font-size: 1.2rem;
`;

const FactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media screen and (max-width: 64rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 48rem) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 32rem) {
    grid-template-columns: 1fr;
  }
`;

const FactCard = styled.div`
  width: 300px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  @media screen and (max-width: 32rem) {
    width: 300px;
  }
  @media screen and (max-width: 48rem) {
    width: 350px;
  }
  @media screen and (max-width: 64rem) {
    width: 250px;
  }
`;

const FactHeadline = styled.h3`
  color: black;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: -10px;
`;

const CardBox = styled.div`
  display: flex;
  justify-content: start;
  margin-block: 10px;
  @media screen and (max-width: 32rem) {
    justify-content: center;
  }
`;

const FactText = styled.p`
  color: black;
`;

const FactNumber = styled.p`
  font-size: 4rem;
  margin-block: -10px;
  color: green;
`;

const NoEntries = styled.p`
  color: red;
`;

export default function DaysCalculator({ currentUser, userId }) {
  const [percentageAchieved, setPercentageAchieved] = useState(0);

  // // USER Data Evaluation ONLY entries //
  useEffect(() => {
    if (currentUser.entries && currentUser.entries.length > 0) {
      const calculatedPercentage =
        (currentUser.projection * 100) /
        currentUser.entries[currentUser.entries.length - 1].weight;
      setPercentageAchieved(calculatedPercentage);
    }
  }, [currentUser]);

  // USER Data Evaluation with or without entries //
  const userName = currentUser.owner.split(" ")[0];
  const numberOfEntries = currentUser.entries.length;

  // USER Data Evaluation with or without entries //

  let oldestEntryRaw;
  let oldestEntryDay;
  let oldestEntryMonth;
  let oldestEntryYear;
  let oldestWeight;
  let latestEntryRaw;
  let latestEntryDay;
  let latestEntryMonth;
  let latestEntryYear;
  let latestWeight;
  let diffInMillicesonds;
  let millisecondsPerDay;
  let diffInDays;
  let lackingPercentage;
  let progessSpeed;
  let daysToReachGoal;

  if (!currentUser.entries || currentUser.entries.length === 0) {
    oldestEntryRaw = null;
    oldestEntryDay = null;
    oldestEntryMonth = null;
    oldestEntryYear = null;
    oldestWeight = null;
    latestEntryRaw = null;
    latestEntryDay = null;
    latestEntryMonth = null;
    latestEntryYear = null;
    latestWeight = null;
    diffInMillicesonds = null;
    millisecondsPerDay = null;
    diffInDays = null;
    lackingPercentage = null;
    progessSpeed = null;
    daysToReachGoal = null;
  } else {
    oldestEntryRaw = new Date(currentUser.entries[0].date);
    oldestEntryDay = oldestEntryRaw.getUTCDate();
    oldestEntryMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(oldestEntryRaw);
    oldestEntryYear = oldestEntryRaw.getUTCFullYear();
    oldestWeight = currentUser.entries[0].weight;

    latestEntryRaw = new Date(
      currentUser.entries[currentUser.entries.length - 1].date
    );
    latestEntryDay = latestEntryRaw.getUTCDate();
    latestEntryMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(latestEntryRaw);
    latestEntryYear = latestEntryRaw.getUTCFullYear();
    latestWeight = currentUser.entries[currentUser.entries.length - 1].weight;

    diffInMillicesonds = latestEntryRaw - oldestEntryRaw;
    millisecondsPerDay = 1000 * 60 * 60 * 24;
    diffInDays = Math.round(diffInMillicesonds / millisecondsPerDay);

    lackingPercentage = (100 - percentageAchieved).toFixed(1);

    // // USER Data Evaluation ONLY with entries //

    progessSpeed =
      Math.round(latestWeight - currentUser.projection) / diffInDays;
    daysToReachGoal =
      Math.round(latestWeight - currentUser.projection) / progessSpeed;
  }
  console.log("Oldest Entry Date Raw " + oldestEntryRaw);
  console.log("Lastest Entry Date Raw " + latestEntryRaw);
  console.log("Latest Weight " + latestWeight);
  console.log("Current Weight " + currentUser.projection);
  console.log("Progress Speed " + progessSpeed);
  console.log("Difference in Day " + diffInDays);

  const props = useSpring({
    to: { width: `${percentageAchieved}%` },
    config: { duration: 800 },
  });

  return (
    <Container>
      <h2>Hello {userName}, </h2>
      <StyledProjectionText>
        You want to reach {currentUser.projection} kilos{" "}
      </StyledProjectionText>
      {numberOfEntries === 0 ? (
        <>
          <NoEntries>No Entries available to show your progress</NoEntries>
          <p>
            You have not yet shared any information with us so that we can set
            up your journey.{" "}
            <Link href={`/profile/data?userId=${userId}`}>Click here</Link> to
            enter your information.
          </p>
        </>
      ) : (
        <>
          <StyledProjectionText>
            You have already done it:{" "}
          </StyledProjectionText>
          <ProgressBarContainer>
            <ProgressBarFill style={props} />
            <PercentageText>{percentageAchieved.toFixed(1)}%</PercentageText>
          </ProgressBarContainer>
          {{ percentageAchieved } > 80 ? (
            <p>Keep Working</p>
          ) : (
            <p>You are doing very well</p>
          )}
          <h2>Check your Numbers & Facts</h2>
        </>
      )}
      <CardBox>
        <FactContainer>
          <FactCard>
            <FactHeadline>Updates</FactHeadline>
            <FactText>You updated your weight</FactText>
            <FactNumber>{numberOfEntries}</FactNumber>
            <FactText>times</FactText>
          </FactCard>
          <FactCard>
            <FactHeadline>Time</FactHeadline>
            <FactText>You fighting for</FactText>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <FactNumber>{diffInDays}</FactNumber>
            )}
            <FactText>days</FactText>
          </FactCard>
          <FactCard>
            <FactHeadline>Start</FactHeadline>
            <FactText>You began your journay with</FactText>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <FactNumber>{oldestWeight}</FactNumber>
            )}
            <FactText>kilos</FactText>
          </FactCard>
          <FactCard>
            <FactHeadline>Current</FactHeadline>
            <FactText>You find yourself with</FactText>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <FactNumber>{latestWeight}</FactNumber>
            )}
            <FactText>kilos</FactText>
          </FactCard>
          <FactCard>
            <FactHeadline>Remaining</FactHeadline>
            <FactText>You are </FactText>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <FactNumber>{lackingPercentage}%</FactNumber>
            )}
            <FactText>from your goal</FactText>
          </FactCard>

          <FactCard>
            <FactHeadline>Missing Path</FactHeadline>
            <FactText>You only have</FactText>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <FactNumber>{daysToReachGoal}</FactNumber>
            )}
            <FactText>days left to reach the end </FactText>
          </FactCard>
          <FactCard>
            <FactHeadline>First Day</FactHeadline>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <>
                <FactText>Thr first entry was on {oldestEntryDay}</FactText>
                <FactNumber>{oldestEntryMonth}</FactNumber>
                <FactText>of {oldestEntryYear}</FactText>
              </>
            )}
          </FactCard>
          <FactCard>
            <FactHeadline>Last Day</FactHeadline>
            {numberOfEntries === 0 ? (
              <>
                <NoEntries>No Entries available</NoEntries>
              </>
            ) : (
              <>
                <FactText>Thr latest entry was on {latestEntryDay}</FactText>
                <FactNumber>{latestEntryMonth}</FactNumber>
                <FactText>of {latestEntryYear}</FactText>
              </>
            )}
          </FactCard>
        </FactContainer>
      </CardBox>
    </Container>
  );
}
