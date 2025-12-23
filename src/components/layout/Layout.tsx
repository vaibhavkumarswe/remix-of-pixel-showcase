import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAppSelector } from '@/store/hooks';
import { CodeBackground } from '@/components/shared/CodeBackground';
import { ParticleSystem } from '@/components/shared/ParticleSystem';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const theme = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Add smooth transition for theme change
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    return () => {
      document.documentElement.style.transition = '';
    };
  }, [theme]);

  return (
    <>
      {/* Global particle system */}
      <ParticleSystem particleCount={50} mouseInfluence={180} />
      
      <CodeBackground 
        variant="subtle" 
        showOrb={true} 
        interactive={true}
        className="min-h-screen"
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex-1 pt-20"
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
      </CodeBackground>
    </>
  );
};
