import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WrapperLayout from "../app/components/WrapperLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuperTokens 💫",
  description: "SuperTokens demo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WrapperLayout>{children}</WrapperLayout>
      </body>
    </html>
  );
}
