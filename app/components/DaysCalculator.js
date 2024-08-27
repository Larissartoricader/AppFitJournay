export default function DaysCalculator({ currentUser }) {
  const userName = currentUser.owner.split(" ")[0];
  const numberOfEntries = currentUser.entries.length;
  const oldestEntryRaw = new Date(currentUser.entries[0].date);
  const oldestEntryDay = oldestEntryRaw.getUTCDate();
  const oldestEntryMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(oldestEntryRaw);

  const oldestEntryYear = oldestEntryRaw.getUTCFullYear();
  const oldestWeight = currentUser.entries[0].weight;
  const latestEntryRaw = new Date(
    currentUser.entries[currentUser.entries.length - 1].date
  );
  const latestEntryDay = latestEntryRaw.getUTCDate();
  const latestEntryMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(latestEntryRaw);
  const latestEntryYear = latestEntryRaw.getUTCFullYear();

  const latestWeight =
    currentUser.entries[currentUser.entries.length - 1].weight;

  const diffInMillicesonds = latestEntryRaw - oldestEntryRaw;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor(diffInMillicesonds / millisecondsPerDay);

  const percentageAchieved = Math.round(
    (currentUser.projection * 100) / latestWeight
  );
  const lackingPercentage = 100 - percentageAchieved;

  const progessSpeed =
    Math.round(latestWeight - currentUser.projection) / diffInDays;
  const daysToReachGoal = Math.round(
    (latestWeight - currentUser.projection) / progessSpeed
  );

  return (
    <>
      <p>
        {userName}, You have updated your weight {numberOfEntries} times. The
        first time you updated your weight, was on {oldestEntryDay}{" "}
        {oldestEntryMonth}, {oldestEntryYear}. Back then you weight were
        {oldestWeight}, but now on {latestEntryDay} {latestEntryMonth},
        {latestEntryYear}, you already achieved {latestWeight}. Your came all
        the way in only {diffInDays} days!
      </p>
      <p>You already archive {percentageAchieved}% of your goal</p>
      <p>You are only {lackingPercentage}% away from archiving your goal</p>

      <p>
        It will take you approximately {daysToReachGoal} days to reach your goal{" "}
      </p>
      {currentUser.owner}
    </>
  );
}
