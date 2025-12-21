import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Smartphone, 
  Palette, 
  Zap, 
  ChevronRight,
  Monitor,
  Code2,
  Sparkles
} from 'lucide-react';

const showcaseItems = [
  {
    id: 'responsive',
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Pixel-perfect layouts that adapt seamlessly across all devices and screen sizes.',
    gradient: 'from-primary to-accent',
    demo: (
      <div className="flex items-end justify-center gap-2 h-32">
        <motion.div 
          initial={{ height: 0 }} 
          animate={{ height: 80 }} 
          transition={{ delay: 0.1 }}
          className="w-8 bg-primary/30 rounded-t-lg border border-primary/50"
        />
        <motion.div 
          initial={{ height: 0 }} 
          animate={{ height: 100 }} 
          transition={{ delay: 0.2 }}
          className="w-12 bg-primary/50 rounded-t-lg border border-primary/60"
        />
        <motion.div 
          initial={{ height: 0 }} 
          animate={{ height: 120 }} 
          transition={{ delay: 0.3 }}
          className="w-20 bg-primary/70 rounded-t-lg border border-primary/80"
        />
      </div>
    )
  },
  {
    id: 'components',
    icon: Layers,
    title: 'Component Systems',
    description: 'Modular, reusable components built for scalability and maintainability.',
    gradient: 'from-accent to-pink-500',
    demo: (
      <div className="grid grid-cols-3 gap-2 p-4">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="aspect-square rounded-lg bg-gradient-to-br from-accent/30 to-pink-500/30 border border-accent/40"
          />
        ))}
      </div>
    )
  },
  {
    id: 'theming',
    icon: Palette,
    title: 'Dynamic Theming',
    description: 'Beautiful themes with seamless light/dark mode transitions.',
    gradient: 'from-pink-500 to-orange-500',
    demo: (
      <div className="flex items-center justify-center gap-4 h-32">
        <motion.div 
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className="w-16 h-16 rounded-full bg-foreground shadow-lg flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-background" />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-1"
        >
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="h-2 rounded-full"
              style={{ 
                width: `${60 - i * 10}px`,
                background: `hsl(${330 + i * 30} 70% 60% / ${0.3 + i * 0.2})`
              }}
            />
          ))}
        </motion.div>
      </div>
    )
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Blazing Performance',
    description: 'Optimized for speed with 90+ Lighthouse scores and instant interactions.',
    gradient: 'from-orange-500 to-yellow-500',
    demo: (
      <div className="flex flex-col items-center justify-center h-32 gap-2">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1 }}
          className="h-3 bg-gradient-to-r from-green-500 to-primary rounded-full w-full max-w-[200px]"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold gradient-text"
        >
          98/100
        </motion.span>
        <span className="text-xs text-muted-foreground">Lighthouse Score</span>
      </div>
    )
  }
];

export const InteractiveShowcase = () => {
  const [activeId, setActiveId] = useState('responsive');
  const activeItem = showcaseItems.find(item => item.id === activeId)!;

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How I <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click each capability to see it in action
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Interactive Tabs */}
            <div className="space-y-3">
              {showcaseItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                    activeId === item.id 
                      ? 'bg-primary/10 border-primary/50 shadow-lg' 
                      : 'bg-card/50 border-border/50 hover:bg-card hover:border-border'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-20`}>
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      activeId === item.id ? 'rotate-90 text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Right: Demo Area */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bento-card min-h-[350px] flex flex-col"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${activeItem.gradient}`}>
                      <activeItem.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{activeItem.title}</h3>
                      <p className="text-xs text-muted-foreground">{activeItem.description}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center bg-secondary/30 rounded-xl">
                    {activeItem.demo}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
