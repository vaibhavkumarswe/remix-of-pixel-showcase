import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Lightbulb, 
  Code2, 
  Rocket,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Discovery',
    description: 'Understanding your vision, goals, and requirements through collaborative discussions.',
    color: 'from-primary to-primary/50'
  },
  {
    id: 2,
    icon: Lightbulb,
    title: 'Strategy',
    description: 'Crafting the perfect technical approach and architecture for your project.',
    color: 'from-accent to-accent/50'
  },
  {
    id: 3,
    icon: Code2,
    title: 'Development',
    description: 'Building with clean, scalable code and continuous communication.',
    color: 'from-pink-500 to-pink-500/50'
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Launch',
    description: 'Deploying your polished product and providing ongoing support.',
    color: 'from-orange-500 to-orange-500/50'
  }
];

export const ProcessSection = () => {
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
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined approach to bringing your ideas to life
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-orange-500 -translate-y-1/2 opacity-30" />

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step Number */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                        {step.id}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Arrow (hidden on last item and mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-4 z-10">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
