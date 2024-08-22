"use client";
import { SessionProvider } from "next-auth/react";
import { GlobalStyle } from "./globalStyles";

// export const metadata = {
//   title: "Fit Journay",
//   description: "Your Fitness Path",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
