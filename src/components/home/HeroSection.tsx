import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Animated Background Mesh
const MeshGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 opacity-30"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.3), transparent),
          radial-gradient(ellipse 60% 40% at 80% 60%, hsl(var(--accent) / 0.2), transparent),
          radial-gradient(ellipse 50% 30% at 40% 80%, hsl(var(--primary) / 0.15), transparent)
        `,
      }}
    />
  </div>
);

// Floating 3D Card Element
const FloatingCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

// Interactive Code Terminal
const CodeTerminal = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  
  const codeLines = [
    { text: 'const developer = {', color: 'text-primary' },
    { text: '  name: "Creative Dev",', color: 'text-foreground/90' },
    { text: '  passion: "Building amazing UX",', color: 'text-foreground/90' },
    { text: '  skills: ["React", "TypeScript", "Animation"],', color: 'text-foreground/90' },
    { text: '  status: "Available for hire ✨"', color: 'text-foreground/90' },
    { text: '};', color: 'text-primary' },
  ];

  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let currentText = '';
    
    const timer = setInterval(() => {
      if (lineIndex < codeLines.length) {
        const currentLineText = codeLines[lineIndex].text;
        if (charIndex <= currentLineText.length) {
          currentText = codeLines.slice(0, lineIndex).map(l => l.text).join('\n') + 
            (lineIndex > 0 ? '\n' : '') + 
            currentLineText.slice(0, charIndex);
          setDisplayText(currentText);
          charIndex++;
        } else {
          lineIndex++;
          setCurrentLine(lineIndex);
          charIndex = 0;
        }
      } else {
        clearInterval(timer);
      }
    }, 35);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />
      
      {/* Terminal Window */}
      <div className="relative glass-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border/50">
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            developer.ts
          </span>
          <div className="w-16" />
        </div>
        
        {/* Code Content */}
        <div className="p-6 font-mono text-sm">
          <pre className="whitespace-pre-wrap leading-relaxed">
            <code>{displayText}</code>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-primary ml-0.5 align-middle"
            />
          </pre>
        </div>
        
        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>
    </motion.div>
  );
};

// Animated Stats
const AnimatedStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass-card rounded-2xl p-5 border border-border/30 backdrop-blur-xl">
        <motion.div 
          className="text-3xl md:text-4xl font-bold gradient-text mb-1"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        >
          {value}
        </motion.div>
        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

// Animated Text Reveal
const AnimatedText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  const words = children.split(' ');
  
  return (
    <motion.span className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            delay: delay + i * 0.05, 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <MeshGradient />
      
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Floating Decorative Elements */}
      <FloatingCard delay={0.2} className="absolute top-[15%] left-[5%] hidden lg:block">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
          <span className="text-2xl font-mono text-primary/60">&lt;/&gt;</span>
        </div>
      </FloatingCard>
      
      <FloatingCard delay={0.4} className="absolute top-[25%] right-[8%] hidden lg:block">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm border border-accent/20 rotate-12 flex items-center justify-center">
          <span className="text-xl font-mono text-accent/60">{ }</span>
        </div>
      </FloatingCard>
      
      <FloatingCard delay={0.6} className="absolute bottom-[25%] left-[8%] hidden lg:block">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-border/30 flex items-center justify-center">
          <span className="text-lg font-mono text-primary/50">=&gt;</span>
        </div>
      </FloatingCard>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Available for new projects</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <span className="block text-foreground">I craft</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <span className="block gradient-text">exceptional</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <span className="block text-foreground">experiences</span>
              </motion.div>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              A senior frontend developer specializing in creating{' '}
              <span className="text-foreground font-medium">performant</span>,{' '}
              <span className="text-foreground font-medium">accessible</span>, and{' '}
              <span className="text-foreground font-medium">visually stunning</span> web applications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-base glow group relative overflow-hidden">
                <Link to="/projects">
                  <span className="relative z-10 flex items-center">
                    Explore My Work
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.3 }}
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base group border-2">
                <Link to="/coding">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Try Challenges
                </Link>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <AnimatedStat value="8+" delay={0.8} label="Years Exp" />
              <AnimatedStat value="50+" delay={0.9} label="Projects" />
              <AnimatedStat value="100%" delay={1} label="Satisfaction" />
            </div>
          </div>

          {/* Right Content - Code Terminal */}
          <div className="hidden lg:block">
            <CodeTerminal />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};
