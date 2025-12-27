import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Award, BookOpen, Heart, Code } from 'lucide-react';
import { GitHubStats } from '@/components/shared/GitHubStats';
import { LeetCodeStats } from '@/components/shared/LeetCodeStats';
import { SkillsRadar } from '@/components/shared/SkillsRadar';
import { ResumeButton } from '@/components/shared/ResumePreview';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: '2025 - Present',
    role: 'Senior Software Engineer',
    company: 'WebileApps',
    description: 'Building frontend architecture for a Fintech SaaS platform serving 100K+ users.',
  },
  {
    year: '2024 - 2025',
    role: 'Senior Frontend Developer',
    company: 'Swift Security',
    description: 'Built AI Extension to enhance user security and privacy while browsing.',
  },
  {
    year: '2021 - 2024',
    role: 'Software Developer',
    company: 'Tata Consultancy Services (Pfizer)',
    description: 'Developed web applications with React and Tailwind CSS for healthcare clients.',
  },
  {
    year: '2021 - 2021',
    role: 'Junior Developer',
    company: 'Ayushya Healthcare',
    description: 'Started journey with HTML, CSS, and JavaScript.',
  },
];

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      
      items?.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate frontend developer with 4+ years of experience crafting
            beautiful, performant, and accessible web experiences.
          </p>
        </motion.div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bento-card gradient-border">
              <h3 className="text-xl font-bold mb-4">The Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                My fascination with machines and how they work began with my father, who encouraged me to explore and build solutions since the 5th class. This curiosity eventually evolved into a passion for Robotics in College, where I discovered the joy of coding machines to work. Today, I specialize in building scalable Software Solutions that not only perform well but are also accessible and beautiful. With every project, I strive to create intuitive digital experiences that make a difference. Web Applications, Extensions, Mobile Apps - you name it, I've built it.
              </p>
            </div>
            <div className="bento-card gradient-border">
              <h3 className="text-xl font-bold mb-4">Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe great software is invisible — it just works. My approach
                combines technical excellence with empathy for users. Every line of
                code should serve a purpose, every interaction should feel natural,
                and every interface should be accessible to everyone.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: MapPin, label: 'Location', value: 'Hyderabad, IN' },
              { icon: Calendar, label: 'Experience', value: '4+ Years' },
              { icon: Award, label: 'Projects', value: '50+ Delivered' },
              { icon: BookOpen, label: 'Learning', value: 'Always' },
              { icon: Heart, label: 'Passion', value: 'Software Solutions' },
              { icon: Code, label: 'Languages', value: 'JavaScript, TypeScript, Python' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bento-card flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* GitHub Stats */}
        <div className="mb-12">
          <GitHubStats />
        </div>

        {/* LeetCode Stats */}
        <div className="mb-24">
          <LeetCodeStats />
        </div>

        {/* Skills Radar */}
        <div className="mb-24">
          <SkillsRadar />
        </div>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <ResumeButton />
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Career <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          {timeline.map((item, index) => (
            <div
              key={item.year}
              className={`timeline-item flex flex-col md:flex-row items-center gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="bento-card">
                  <span className="text-primary font-mono text-sm">{item.year}</span>
                  <h3 className="text-xl font-bold mt-2">{item.role}</h3>
                  <p className="text-muted-foreground font-medium">{item.company}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                </div>
              </div>
              <div className="w-4 h-4 rounded-full bg-primary glow hidden md:block" />
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
