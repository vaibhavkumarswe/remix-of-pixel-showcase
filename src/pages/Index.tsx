import { HeroSection } from '@/components/home/HeroSection';
import { BentoGrid } from '@/components/home/BentoGrid';
import { SkillsSection } from '@/components/home/SkillsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <BentoGrid />
      <SkillsSection />
      <CTASection />
    </>
  );
};

export default Index;
