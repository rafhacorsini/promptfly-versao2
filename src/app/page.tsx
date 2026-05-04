import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import SocialProofBar from "@/components/SocialProofBar";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Hero />
      <ValueProposition />
      <SocialProofBar />
    </div>
  );
}
