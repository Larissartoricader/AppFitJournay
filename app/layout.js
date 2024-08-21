import "./globals.css";

export const metadata = {
  title: "Fit Journay",
  description: "Your Fitness Path",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
