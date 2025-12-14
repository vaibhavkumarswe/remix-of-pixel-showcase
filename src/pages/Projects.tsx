import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    image: 'linear-gradient(135deg, hsl(187 85% 43% / 0.3), hsl(262 83% 58% / 0.3))',
    featured: true,
  },
  {
    id: 2,
    title: 'Design System',
    description: 'A comprehensive component library with 50+ accessible components, theming, and documentation.',
    tags: ['React', 'Storybook', 'Tailwind', 'Radix UI'],
    image: 'linear-gradient(135deg, hsl(262 83% 58% / 0.3), hsl(330 80% 60% / 0.3))',
    featured: true,
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization dashboard with customizable widgets and export capabilities.',
    tags: ['React', 'D3.js', 'GraphQL', 'PostgreSQL'],
    image: 'linear-gradient(135deg, hsl(45 93% 47% / 0.3), hsl(25 95% 53% / 0.3))',
    featured: false,
  },
  {
    id: 4,
    title: 'Social Platform',
    description: 'A community platform with real-time messaging, content feeds, and user engagement features.',
    tags: ['React', 'Socket.io', 'Redis', 'MongoDB'],
    image: 'linear-gradient(135deg, hsl(142 76% 36% / 0.3), hsl(187 85% 43% / 0.3))',
    featured: false,
  },
  {
    id: 5,
    title: 'AI Writing Assistant',
    description: 'An AI-powered writing tool with real-time suggestions, grammar checking, and tone adjustment.',
    tags: ['Next.js', 'OpenAI', 'Vercel AI', 'TipTap'],
    image: 'linear-gradient(135deg, hsl(280 83% 58% / 0.3), hsl(187 85% 43% / 0.3))',
    featured: true,
  },
  {
    id: 6,
    title: 'Portfolio Generator',
    description: 'A drag-and-drop portfolio builder with templates, custom domains, and analytics.',
    tags: ['React', 'DnD Kit', 'Supabase', 'Tailwind'],
    image: 'linear-gradient(135deg, hsl(0 84% 60% / 0.3), hsl(25 95% 53% / 0.3))',
    featured: false,
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've built, from complex web applications
            to open-source contributions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid gap-8 mb-16">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bento-card overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div
                    className="lg:w-1/2 h-64 lg:h-auto rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ background: project.image }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-6xl font-bold opacity-30"
                    >
                      {String(project.id).padStart(2, '0')}
                    </motion.div>
                  </div>
                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                      <Button size="sm" className="rounded-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-8"
        >
          More Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bento-card group cursor-pointer"
            >
              <div
                className="h-40 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: project.image }}
              >
                <ArrowUpRight className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
