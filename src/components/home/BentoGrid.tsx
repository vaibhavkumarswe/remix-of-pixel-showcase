import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Palette,
  Zap,
  Globe,
  Gamepad2,
  Trophy,
  Coffee,
  Heart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FloatingCodeElement } from '@/components/shared/CodeBackground';

gsap.registerPlugin(ScrollTrigger);

const bentoItems = [
  {
    id: 1,
    title: '8+ Years',
    subtitle: 'Frontend Experience',
    icon: Code2,
    gradient: 'from-primary/20 to-accent/20',
    size: 'col-span-2 row-span-1',
    content: 'Building scalable applications with React, Vue, and Angular',
  },
  {
    id: 2,
    title: 'Design Systems',
    subtitle: 'Component Libraries',
    icon: Palette,
    gradient: 'from-accent/20 to-pink-500/20',
    size: 'col-span-1 row-span-2',
    content: 'Creating reusable, accessible UI components',
  },
  {
    id: 3,
    title: 'Performance',
    subtitle: '90+ Lighthouse Score',
    icon: Zap,
    gradient: 'from-yellow-500/20 to-primary/20',
    size: 'col-span-1 row-span-1',
    content: 'Optimized for speed & Core Web Vitals',
  },
  {
    id: 4,
    title: '50+ Projects',
    subtitle: 'Delivered Worldwide',
    icon: Globe,
    gradient: 'from-primary/20 to-green-500/20',
    size: 'col-span-1 row-span-1',
    content: 'From startups to enterprise solutions',
  },
  {
    id: 5,
    title: 'Game Dev',
    subtitle: 'Interactive Experiences',
    icon: Gamepad2,
    gradient: 'from-purple-500/20 to-primary/20',
    size: 'col-span-2 row-span-1',
    link: '/games',
    content: 'Building fun & engaging browser games',
  },
  {
    id: 6,
    title: 'Open Source',
    subtitle: '1000+ Contributions',
    icon: Trophy,
    gradient: 'from-orange-500/20 to-accent/20',
    size: 'col-span-1 row-span-1',
    content: 'Active contributor to major projects',
  },
  {
    id: 7,
    title: '∞ Coffee',
    subtitle: 'Fuel for Code',
    icon: Coffee,
    gradient: 'from-amber-500/20 to-orange-500/20',
    size: 'col-span-1 row-span-1',
    content: 'Powered by caffeine',
  },
  {
    id: 8,
    title: 'Passion',
    subtitle: 'For Clean Code',
    icon: Heart,
    gradient: 'from-red-500/20 to-pink-500/20',
    size: 'col-span-1 row-span-1',
    content: 'Writing maintainable, elegant solutions',
  },
];

export const BentoGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.bento-item');
      
      cards?.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Section-specific floating elements */}
      <FloatingCodeElement delay={0.2} duration={5} className="text-primary/20 text-xl font-mono" style={{ top: '10%', left: '5%' }}>{'const'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.4} duration={4} className="text-accent/20 text-lg font-mono" style={{ top: '20%', right: '10%' }}>{'return'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.6} duration={5.5} className="text-primary/15 text-lg font-mono" style={{ bottom: '15%', right: '5%' }}>{'export'}</FloatingCodeElement>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What I <span className="gradient-text">Bring</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A blend of technical expertise, creative vision, and passion for building exceptional digital experiences.
          </p>
        </motion.div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {bentoItems.map((item) => {
            const CardContent = (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-background/50 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.content}
                </p>
              </motion.div>
            );

            const className = `bento-item bento-card group cursor-pointer ${item.size} bg-gradient-to-br ${item.gradient}`;
            
            return item.link ? (
              <Link key={item.id} to={item.link} className={className}>
                {CardContent}
              </Link>
            ) : (
              <div key={item.id} className={className}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
