// "use client";

// import styles from "./page.module.css";
// import Link from "next/link";
// import Login from "./components/Login";
// import { useSession } from "next-auth/react";
// import useSWR from "swr";

// export default function Home() {
//   const { data: session } = useSession();
//   const { data: users, isLoading, error } = useSWR("/api/users");

//   if (isLoading) {
//     return <h2>Loading...</h2>;
//   }

//   if (error) {
//     return <h1>Ops! Something went wrong while trying to read the Data</h1>;
//   }

//   // Debugging logs to inspect data
//   console.log("Session data:", session);
//   console.log("Users data:", users);

//   // Check if session email exists in users' email arrays
//   const userExists =
//     session?.user?.email &&
//     users?.some(
//       (user) =>
//         Array.isArray(user.email) && // Check if user.email is an array
//         user.email.includes(session.user.email) // Check if session email is in the array
//     );

//   console.log("User exists:", userExists);
//   return (
//     <>
//       <h1>FitJourney</h1>
//       <Login />
//       {session && (
//         <Link href="./profile">
//           <button>Profil</button>
//         </Link>
//       )}
//     </>
//   );
// }

"use client";

import styles from "./page.module.css";
import Link from "next/link";
import Login from "./components/Login";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function Home() {
  const { data: session, status } = useSession(); // status will be 'loading', 'authenticated' or 'unauthenticated'
  const { data: users, isLoading, error } = useSWR("/api/users");

  // Loading states
  if (status === "loading" || isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h1>Ops! Something went wrong while trying to read the Data</h1>;
  }

  // Check if session email exists in users' email arrays
  const userExists =
    session?.user?.email &&
    users?.some(
      (user) =>
        Array.isArray(user.email) && // Check if user.email is an array
        user.email.includes(session.user.email) // Check if session email is in the array
    );

  console.log("Session data:", session);
  console.log("Users data:", users);
  console.log("User exists:", userExists);

  return (
    <>
      <h1>FitJourney</h1>

      <Login />

      {session && userExists && (
        <Link href="./profile">
          <button>Profil</button>
        </Link>
      )}
    </>
  );
}
