import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAppSelector } from '@/store/hooks';
import { CodeBackground } from '@/components/shared/CodeBackground';
import { ParticleSystem } from '@/components/shared/ParticleSystem';
import { CommandPalette } from '@/components/shared/CommandPalette';
import { InteractiveTerminal } from '@/components/shared/InteractiveTerminal';
import { FloatingActionButton } from '@/components/shared/FloatingActionButton';

interface LayoutProps {
  children: ReactNode;
}

// Enhanced page transition variants with slide effect
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Loading screen component with enhanced animation
const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
          animate={{ 
            rotate: [0, 180],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center gap-6"
        >
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30"
            animate={{ 
              rotate: [0, 360],
              borderRadius: ['16px', '32px', '16px'],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              borderRadius: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <span className="text-primary-foreground font-bold text-3xl">&lt;/&gt;</span>
          </motion.div>
          
          {/* Loading bar */}
          <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          <motion.p
            className="text-muted-foreground text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading experience...
          </motion.p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Page transition wrapper with clip-path animation
const PageTransition = ({ children, pathname }: { children: ReactNode; pathname: string }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative"
    >
      {/* Transition overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-primary pointer-events-none"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], originY: [0, 0, 1, 1] }}
        transition={{ 
          duration: 0.8, 
          times: [0, 0.4, 0.6, 1],
          ease: [0.22, 1, 0.36, 1]
        }}
      />
      
      <motion.main
        variants={pageVariants}
        className="flex-1 pt-20"
      >
        {children}
      </motion.main>
    </motion.div>
  </AnimatePresence>
);

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const theme = useAppSelector((state) => state.theme.mode);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    return () => {
      document.documentElement.style.transition = '';
    };
  }, [theme]);

  // Initial page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsFirstLoad(false), 500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <ParticleSystem particleCount={40} mouseInfluence={150} />
      <CommandPalette onOpenTerminal={() => setIsTerminalOpen(true)} />
      <InteractiveTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <FloatingActionButton />
      
      <CodeBackground 
        variant="subtle" 
        showOrb={true} 
        interactive={true}
        className="min-h-screen"
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          
          {/* Smooth page transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col"
            >
              {/* Page slide transition */}
              <motion.div
                initial={!isFirstLoad ? { y: 50, opacity: 0, filter: 'blur(10px)' } : false}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -30, opacity: 0, filter: 'blur(5px)' }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-1"
              >
                <main className="pt-20 min-h-[calc(100vh-200px)]">
                  {children}
                </main>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <Footer />
        </div>
      </CodeBackground>
    </>
  );
};