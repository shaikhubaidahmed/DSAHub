import type { Metadata } from "next";
import { ProblemsExplorer } from "@/components/problems-explorer";

export const metadata: Metadata = { title: "Problem explorer" };

export default function ProblemsPage() {
  return <ProblemsExplorer />;
}
