import type { Metadata } from "next";
import { HomeDashboard } from "@/components/home-dashboard";

export const metadata: Metadata = { title: "DSA practice, organized" };

export default function HomePage() {
  return <HomeDashboard />;
}
