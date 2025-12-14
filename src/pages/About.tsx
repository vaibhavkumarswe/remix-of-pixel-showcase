import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: '2023 - Present',
    role: 'Senior Frontend Engineer',
    company: 'Tech Startup',
    description: 'Leading frontend architecture for a SaaS platform serving 100K+ users.',
  },
  {
    year: '2020 - 2023',
    role: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Built 30+ client projects including e-commerce and enterprise dashboards.',
  },
  {
    year: '2018 - 2020',
    role: 'Full Stack Developer',
    company: 'Software Company',
    description: 'Developed full-stack applications with React and Node.js.',
  },
  {
    year: '2016 - 2018',
    role: 'Junior Developer',
    company: 'Web Studio',
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
            A passionate frontend developer with 8+ years of experience crafting
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
                I started coding at 16, fascinated by how websites worked. What began
                as curiosity evolved into a deep passion for creating intuitive digital
                experiences. Today, I specialize in building scalable React applications
                with a focus on performance, accessibility, and beautiful design.
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
              { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
              { icon: Calendar, label: 'Experience', value: '8+ Years' },
              { icon: Award, label: 'Projects', value: '50+ Delivered' },
              { icon: BookOpen, label: 'Learning', value: 'Always' },
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
