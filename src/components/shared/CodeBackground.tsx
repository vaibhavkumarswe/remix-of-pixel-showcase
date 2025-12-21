import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, CSSProperties } from 'react';

interface FloatingCodeElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

export const FloatingCodeElement = ({ 
  children, 
  delay = 0, 
  duration = 4,
  className = '',
  style = {}
}: FloatingCodeElementProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 0.6, 
      scale: 1,
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5 },
      y: { delay, duration, repeat: Infinity, ease: "easeInOut" },
      rotate: { delay, duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" }
    }}
    className={`absolute pointer-events-none select-none ${className}`}
    style={style}
  >
    {children}
  </motion.div>
);

const codeSymbols = [
  { symbol: '</>', className: 'text-primary/30 text-xl md:text-2xl font-mono font-bold' },
  { symbol: '{ }', className: 'text-accent/30 text-lg md:text-xl font-mono font-bold' },
  { symbol: '( )', className: 'text-primary/25 text-base md:text-lg font-mono' },
  { symbol: '[ ]', className: 'text-accent/25 text-base md:text-lg font-mono' },
  { symbol: '=>', className: 'text-primary/30 text-lg md:text-xl font-mono font-bold' },
  { symbol: '&&', className: 'text-accent/25 text-base md:text-lg font-mono' },
  { symbol: '||', className: 'text-primary/25 text-base md:text-lg font-mono' },
  { symbol: '===', className: 'text-accent/30 text-base md:text-lg font-mono' },
  { symbol: '...', className: 'text-primary/25 text-xl md:text-2xl font-mono' },
  { symbol: '/**/', className: 'text-accent/25 text-xs md:text-sm font-mono' },
  { symbol: '#', className: 'text-primary/25 text-lg md:text-xl font-mono' },
  { symbol: '@', className: 'text-accent/30 text-lg md:text-xl font-mono' },
];

interface CodeBackgroundProps {
  variant?: 'default' | 'subtle' | 'dense';
  showGrid?: boolean;
  showOrb?: boolean;
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CodeBackground = ({ 
  variant = 'default',
  showGrid = true,
  showOrb = true,
  interactive = true,
  className = '',
  children 
}: CodeBackgroundProps) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  
  const orbX = useTransform(smoothMouseX, [0, 1], [-30, 30]);
  const orbY = useTransform(smoothMouseY, [0, 1], [-30, 30]);

  const [positions, setPositions] = useState<Array<{ top: string; left: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    const count = variant === 'dense' ? 14 : variant === 'subtle' ? 6 : 10;
    const newPositions = Array.from({ length: count }, () => ({
      top: `${Math.random() * 85 + 5}%`,
      left: `${Math.random() * 85 + 5}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3
    }));
    setPositions(newPositions);
  }, [variant]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const gridOpacity = variant === 'subtle' ? 0.02 : 0.03;
  const dotOpacity = variant === 'subtle' ? 0.03 : 0.04;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Grid Pattern */}
      {showGrid && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: gridOpacity,
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      )}

      {/* Dot Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: dotOpacity,
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '25px 25px'
        }}
      />

      {/* Interactive Orb */}
      {showOrb && (
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div 
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--accent) / 0.05) 50%, transparent 70%)',
              filter: 'blur(50px)'
            }}
          />
        </motion.div>
      )}

      {/* Floating Code Symbols */}
      {positions.map((pos, index) => {
        const symbolData = codeSymbols[index % codeSymbols.length];
        return (
          <FloatingCodeElement
            key={index}
            delay={pos.delay}
            duration={pos.duration}
            className={symbolData.className}
            style={{ top: pos.top, left: pos.left }}
          >
            {symbolData.symbol}
          </FloatingCodeElement>
        );
      })}

      {/* Corner Geometric Accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-8 left-8 w-16 h-16 border border-primary/10 rounded-lg rotate-12" />
        <div className="absolute top-16 right-12 w-10 h-10 border border-accent/10 rounded-full" />
        <div className="absolute bottom-16 left-16 w-12 h-12 border border-primary/10 rounded-2xl -rotate-6" />
        <div className="absolute bottom-12 right-8 w-8 h-8 border border-accent/10 rounded-lg rotate-45" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Page wrapper with full background
interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const PageBackground = ({ children, className = '' }: PageBackgroundProps) => (
  <CodeBackground variant="default" showOrb={true} interactive={true} className={className}>
    {children}
  </CodeBackground>
);

// Section wrapper with subtle background
interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  withOrb?: boolean;
}

export const SectionBackground = ({ children, className = '', withOrb = false }: SectionBackgroundProps) => (
  <CodeBackground variant="subtle" showOrb={withOrb} interactive={false} className={className}>
    {children}
  </CodeBackground>
);
