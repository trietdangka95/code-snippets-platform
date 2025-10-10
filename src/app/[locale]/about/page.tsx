import {
  HeroSection,
  MissionSection,
  StatsSection,
  TechStackSection,
} from "@/components/AboutPage";

const AboutPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <TechStackSection />
    </div>
  );
};

export default AboutPage;
