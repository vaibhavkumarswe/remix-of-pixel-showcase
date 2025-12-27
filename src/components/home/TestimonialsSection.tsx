import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingCodeElement } from '@/components/shared/CodeBackground';
import { testimonials } from '@/data/testimonials';


export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 px-6 bg-secondary/30 overflow-hidden relative">
      {/* Floating elements */}
      <FloatingCodeElement delay={0.2} duration={5} className="text-primary/20 text-lg font-mono" style={{ top: '15%', left: '8%' }}>{'★★★'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.5} duration={4} className="text-accent/20 text-lg font-mono" style={{ top: '20%', right: '12%' }}>{'100%'}</FloatingCodeElement>
      <FloatingCodeElement delay={0.7} duration={5.5} className="text-primary/15 text-xl font-mono" style={{ bottom: '18%', left: '10%' }}>{'A+'}</FloatingCodeElement>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Workmates <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="relative h-[450px] md:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="bento-card h-full flex flex-col justify-between">
                  <div>
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-lg md:text-xl text-foreground leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{testimonials[currentIndex].avatar}</span>
                      <div>
                        <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
