import ScrollUp from "@/components/Common/ScrollUp";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Investasi",
  description: "Kalkulator untuk menghitung investasi agar lebih mudah",
};

export default function Home() {
 
  return (
    <main>
      <ScrollUp />
      <Pricing />
      <Team />
    </main>
  );
}
