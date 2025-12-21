import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FloatingCodeElement } from '@/components/shared/CodeBackground';

export const CTASection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'var(--gradient-primary)',
            filter: 'blur(150px)',
          }}
        />
      </div>

      {/* Floating Code Elements */}
      <FloatingCodeElement delay={0.2} duration={4} className="text-primary/25 text-xl font-mono font-bold" style={{ top: '15%', left: '10%' }}>{'git push'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.4} duration={5} className="text-accent/25 text-lg font-mono" style={{ top: '25%', right: '15%' }}>{'deploy'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.6} duration={4.5} className="text-primary/20 text-lg font-mono" style={{ bottom: '20%', left: '15%' }}>{'build'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.8} duration={5.5} className="text-accent/20 text-xl font-mono" style={{ bottom: '25%', right: '10%' }}>{'ship'}</FloatingCodeElement>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Build Something
            <span className="block gradient-text">Amazing Together</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Whether you need a stunning landing page, a complex web application,
            or a complete design system — I'm here to help bring your vision to life.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="rounded-full px-8 glow group">
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
