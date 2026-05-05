import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import SocialProofBar from "@/components/SocialProofBar";
import Reality from "@/components/Reality";
import Outcome from "@/components/Outcome";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Hero />
      <ValueProposition />
      <SocialProofBar />
      <Reality />
      <Outcome />
      <Process />
      <Reviews />
      <Faq />
      <Newsletter />
      <Footer />
    </div>
  );
}
