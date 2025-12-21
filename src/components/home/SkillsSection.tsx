import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingCodeElement } from '@/components/shared/CodeBackground';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: 'Next.js', level: 88 },
  { name: 'Vue.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'GraphQL', level: 82 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'GSAP', level: 88 },
];

const technologies = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js', 'Nuxt.js',
  'Redux', 'Zustand', 'TanStack Query', 'GraphQL', 'REST APIs',
  'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma',
  'Tailwind CSS', 'Styled Components', 'SASS', 'CSS Modules',
  'GSAP', 'Framer Motion', 'Three.js', 'WebGL',
  'Jest', 'Cypress', 'Playwright', 'Vitest',
  'Git', 'Docker', 'AWS', 'Vercel', 'Netlify',
];

export const SkillsSection = () => {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsRef.current?.querySelectorAll('.skill-bar-fill');
      
      bars?.forEach((bar) => {
        gsap.from(bar, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          },
          width: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      });
    }, barsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Section-specific floating elements */}
      <FloatingCodeElement delay={0.1} duration={4.5} className="text-primary/20 text-lg font-mono" style={{ top: '8%', right: '8%' }}>{'npm'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.3} duration={5} className="text-accent/20 text-lg font-mono" style={{ top: '25%', left: '5%' }}>{'yarn'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.5} duration={4} className="text-primary/15 text-xl font-mono" style={{ bottom: '20%', left: '8%' }}>{'tsx'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.7} duration={5.5} className="text-accent/15 text-lg font-mono" style={{ bottom: '10%', right: '12%' }}>{'jsx'}</FloatingCodeElement>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit honed through years of building production applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Skill Bars */}
          <div ref={barsRef} className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-primary font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: 'var(--gradient-primary)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-3 content-start">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
