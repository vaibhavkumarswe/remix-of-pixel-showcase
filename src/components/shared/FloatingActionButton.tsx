import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, MessageCircle, ChevronUp, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumePreview } from './ResumePreview';

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fabItems = [
    { 
      icon: FileText, 
      label: 'Resume', 
      action: () => { setIsResumeOpen(true); setIsOpen(false); },
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: MessageCircle, 
      label: 'Contact', 
      href: '/contact',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <>
      {/* FAB Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-muted/80 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* FAB Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-end gap-3 mb-2"
            >
              {fabItems.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x: 0,
                      transition: { delay: (fabItems.length - 1 - index) * 0.05 }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0, 
                      x: 20,
                      transition: { delay: index * 0.03 }
                    }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3"
                  >
                    <span className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-sm font-medium shadow-lg">
                      {item.label}
                    </span>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <Link 
                    key={item.label} 
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {content}
                  </Link>
                ) : (
                  <button key={item.label} onClick={item.action}>
                    {content}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-muted/90 backdrop-blur-md border border-border/50' 
              : 'bg-gradient-to-br from-primary to-accent glow'
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="sparkles"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse ring when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      {/* Backdrop when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-background/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Resume Preview Modal */}
      <ResumePreview isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};