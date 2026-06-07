import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your project is underway",
  description: "Live project workspace, powered by EndpointLabs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
