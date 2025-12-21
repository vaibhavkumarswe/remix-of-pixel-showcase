import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MousePointer2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FloatingShape = ({ 
  delay, 
  duration, 
  className,
  children 
}: { 
  delay: number; 
  duration: number; 
  className: string;
  children?: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5 },
      y: { delay, duration, repeat: Infinity, ease: "easeInOut" },
      rotate: { delay, duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const InteractiveOrb = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const x = useTransform(mouseX, [0, 1], [-50, 50]);
  const y = useTransform(mouseY, [0, 1], [-50, 50]);
  
  return (
    <motion.div
      style={{ x, y }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none"
    >
      <div 
        className="w-full h-full rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
};

const CodeBlock = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `const developer = {
  name: "Creative Dev",
  passion: "Building amazing UX",
  skills: ["React", "TypeScript", "Animation"],
  status: "Available for hire ✨"
};`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-[400px]"
    >
      <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">developer.ts</span>
        </div>
        <pre className="text-sm font-mono text-foreground/90 whitespace-pre-wrap">
          <code>{displayText}<span className="animate-blink border-r-2 border-primary">&nbsp;</span></code>
        </pre>
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="glass-card rounded-xl p-4 border border-border/30 cursor-default"
  >
    <div className="text-2xl md:text-3xl font-bold gradient-text">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </motion.div>
);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Interactive Background */}
      <InteractiveOrb mouseX={smoothMouseX} mouseY={smoothMouseY} />
      
      {/* Floating Decorative Elements */}
      <FloatingShape delay={0.2} duration={4} className="absolute top-20 left-[10%] w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30" />
      <FloatingShape delay={0.4} duration={5} className="absolute top-40 right-[20%] w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30" />
      <FloatingShape delay={0.6} duration={3.5} className="absolute bottom-32 left-[15%] w-20 h-20 rounded-3xl bg-primary/10 backdrop-blur-sm border border-primary/20 rotate-12" />
      <FloatingShape delay={0.3} duration={4.5} className="absolute bottom-48 right-[30%] w-8 h-8 rounded-lg bg-accent/30 backdrop-blur-sm border border-accent/40" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Open to new opportunities</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="block text-foreground">I craft</span>
            <span className="block gradient-text">digital</span>
            <span className="block text-foreground">experiences</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            A senior frontend developer specializing in creating <span className="text-foreground font-medium">performant</span>, <span className="text-foreground font-medium">accessible</span>, and <span className="text-foreground font-medium">visually stunning</span> web applications.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button asChild size="lg" className="rounded-full px-8 glow group">
              <Link to="/projects">
                Explore My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 group">
              <Link to="/challenges">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Try Challenges
              </Link>
            </Button>
          </motion.div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-4">
            <StatCard value="8+" delay={0.9} label="Years Experience" />
            <StatCard value="50+" delay={1} label="Projects Delivered" />
            <StatCard value="100%" delay={1.1} label="Client Satisfaction" />
          </div>
        </div>

        {/* Animated Code Block */}
        <CodeBlock />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-5 w-5 text-muted-foreground" />
        </motion.div>
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
      </motion.div>
    </section>
  );
};
