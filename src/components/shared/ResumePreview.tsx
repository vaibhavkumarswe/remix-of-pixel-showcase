import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileText, ExternalLink, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ResumePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumePreview = ({ isOpen, onClose }: ResumePreviewProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDownloading(false);
    toast({
      title: "Resume Downloaded!",
      description: "Your resume has been saved to your downloads folder.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/resume');
    toast({
      title: "Link Copied!",
      description: "Resume link copied to clipboard.",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold">Resume Preview</h2>
                  <p className="text-sm text-muted-foreground">Creative Developer - Senior Frontend Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-8 bg-white dark:bg-slate-900">
              <div className="max-w-2xl mx-auto space-y-8 text-foreground">
                {/* Header */}
                <div className="text-center border-b border-border pb-6">
                  <h1 className="text-3xl font-bold mb-2">Creative Developer</h1>
                  <p className="text-lg text-primary font-medium mb-4">Senior Frontend Engineer</p>
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <span>San Francisco, CA</span>
                    <span>•</span>
                    <span>hello@developer.com</span>
                    <span>•</span>
                    <span>github.com/developer</span>
                  </div>
                </div>

                {/* Summary */}
                <section>
                  <h2 className="text-xl font-bold mb-3 text-primary">Professional Summary</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Senior Frontend Engineer with 8+ years of experience building scalable web applications. 
                    Specialized in React, TypeScript, and modern frontend architecture. Passionate about 
                    creating performant, accessible, and visually stunning user experiences. Led teams of 
                    5+ developers and delivered 50+ successful projects.
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <h2 className="text-xl font-bold mb-4 text-primary">Work Experience</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">Senior Frontend Engineer</h3>
                          <p className="text-primary">Tech Startup</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2023 - Present</span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Led frontend architecture for a SaaS platform serving 100K+ users</li>
                        <li>Reduced page load time by 60% through performance optimizations</li>
                        <li>Mentored team of 5 junior developers</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">Frontend Developer</h3>
                          <p className="text-primary">Digital Agency</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2020 - 2023</span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Built 30+ client projects including e-commerce and enterprise dashboards</li>
                        <li>Implemented design systems used across multiple projects</li>
                        <li>Collaborated with designers to create pixel-perfect interfaces</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">Full Stack Developer</h3>
                          <p className="text-primary">Software Company</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2018 - 2020</span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Developed full-stack applications with React and Node.js</li>
                        <li>Created RESTful APIs serving 1M+ requests daily</li>
                        <li>Implemented CI/CD pipelines reducing deployment time by 70%</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-xl font-bold mb-3 text-primary">Technical Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Figma'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-secondary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-xl font-bold mb-3 text-primary">Education</h2>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">B.S. Computer Science</h3>
                      <p className="text-muted-foreground">University of Technology</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2016</span>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
              <p className="text-sm text-muted-foreground">
                Last updated: December 2024
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleDownload} disabled={isDownloading}>
                  {isDownloading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Trigger button component
export const ResumeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FileText className="h-4 w-4" />
        <span className="text-sm font-medium">View Resume</span>
      </motion.button>
      <ResumePreview isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
