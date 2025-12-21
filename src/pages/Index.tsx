import { HeroSection } from '@/components/home/HeroSection';
import { BentoGrid } from '@/components/home/BentoGrid';
import { InteractiveShowcase } from '@/components/home/InteractiveShowcase';
import { SkillsSection } from '@/components/home/SkillsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <BentoGrid />
      <InteractiveShowcase />
      <SkillsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Index;
