"use client";
import { SessionProvider } from "next-auth/react";
import { GlobalStyle } from "./globalStyles";
import { SWRConfig } from "swr";
// export const metadata = {
//   title: "Fit Journay",
//   description: "Your Fitness Path",
// };

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while trying to fetch");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <SessionProvider>
          <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
        </SessionProvider>
      </body>
    </html>
  );
}
