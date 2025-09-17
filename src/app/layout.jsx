import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "투두 앱",
  description: "투두 앱 입니다",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-[800px] mx-auto py-20`}>
        <Header />
          <Provider>
            <main className="bg-gray-200 p-4">{children}</main>
          </Provider>
        <Footer />
      </body>
    </html>
  );
}
