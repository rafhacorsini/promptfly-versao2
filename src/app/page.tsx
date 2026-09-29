import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import SocialProofBar from "@/components/SocialProofBar";
import Library from "@/components/Library";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import Plans from "@/components/Plans";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import { featuredSlugs } from "@/content/resources";
import {
  getAllResources,
  getHeroResources,
  getPremiumTemplateCount,
} from "@/lib/resources";

export default function Home() {
  const all = getAllResources();

  const stats = [
    { value: site.stats.followers, label: "seguidores no Instagram" },
    { value: site.stats.biggestReelViews, label: "views no maior reel" },
    // Contado do arquivo de dados: nunca desatualiza nem infla.
    { value: String(all.length), label: "recursos na biblioteca" },
    { value: site.stats.vipMembers, label: "membros no grupo VIP" },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <Hero />
      <ValueProposition cards={getHeroResources()} />
      <SocialProofBar stats={stats} />
      <Library all={all} featured={featuredSlugs} />
      <Process />
      <Comparison />
      <Plans premiumTemplates={getPremiumTemplateCount()} price={site.premium.price} />
      <About />
      <Faq />
      <Newsletter />
      <Footer />
    </div>
  );
}
