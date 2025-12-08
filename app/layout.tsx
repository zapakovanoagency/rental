import type { Metadata } from "next";
import { Nunito_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import Footer from "@/components/Footer";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "RentalLviv - Оренда автомобілів",
  description: "Оренда автомобілів у Львові",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${nunitoSans.variable} ${unbounded.variable} antialiased`}
      >
        <div className="hidden lg:block">
          <Header />
        </div>
        <MobileHeader />
        <main className="pt-[35px] md:pt-[56px] lg:pt-[70px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
