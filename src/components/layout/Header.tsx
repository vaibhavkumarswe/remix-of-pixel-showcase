import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronDown, FileText, Gamepad2, BookOpen, Code2, Wrench, User, MessageCircle, FolderGit2, Brain, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ResumePreview } from '@/components/shared/ResumePreview';

const mainNavItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
];

const moreItems = [
  { name: 'Blog', path: '/blog', icon: BookOpen, description: 'Tech articles & tutorials' },
  { name: 'Coding Challenges', path: '/coding', icon: Code2, description: 'Practice coding problems' },
  { name: 'Games', path: '/games', icon: Gamepad2, description: 'Fun mini-games' },
  { name: 'Snippets', path: '/snippets', icon: FileText, description: 'Useful code snippets' },
  { name: 'Resources', path: '/resources', icon: Wrench, description: 'Tools & resources' },
  { name: 'Ask AI', path: '/ask-ai', icon: Brain, description: 'AI-powered Q&A' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <nav className="container mx-auto px-4 md:px-6">
          <motion.div
            layout
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'glass-card rounded-2xl px-6 py-3 shadow-lg border border-border/30'
                : 'px-2 py-2'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="relative group z-10">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-primary-foreground font-bold text-lg">&lt;/&gt;</span>
                </motion.div>
                <span className="hidden sm:block text-xl font-bold gradient-text">
                  DevPortfolio
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <motion.div 
                className="flex items-center gap-1 p-1.5 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Main Nav Items */}
                {mainNavItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link key={item.path} to={item.path} className="relative">
                      <motion.div
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative z-10 ${
                          active
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                        {active && (
                          <motion.div
                            layoutId="navPill"
                            className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10"
                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}

                {/* More Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      More
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="center" 
                    className="w-64 p-2 glass-card border-border/50 rounded-2xl shadow-2xl"
                    sideOffset={12}
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                      Explore More
                    </DropdownMenuLabel>
                    {moreItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all group ${
                              active ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                            }`}
                          >
                            <div className={`p-2 rounded-lg transition-colors ${
                              active ? 'bg-primary/20' : 'bg-muted/50 group-hover:bg-primary/10'
                            }`}>
                              <Icon className={`h-4 w-4 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                            </div>
                            <div className="flex-1">
                              <div className={`text-sm font-medium ${active ? 'text-primary' : ''}`}>
                                {item.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/contact"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-muted/50 group"
                      >
                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                          <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">Contact</div>
                          <div className="text-xs text-muted-foreground">Get in touch</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              {/* Resume Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex rounded-full px-4 gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  onClick={() => setIsResumeOpen(true)}
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="hidden md:block"
              >
                <Button asChild size="sm" className="rounded-full px-5 glow group">
                  <Link to="/contact">
                    <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Hire Me
                  </Link>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full bg-secondary/80"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.25 }}
              className="fixed top-24 left-4 right-4 z-50 lg:hidden max-h-[calc(100vh-120px)] overflow-auto"
            >
              <div className="glass-card rounded-3xl p-6 border border-border/50 shadow-2xl">
                {/* Main Links */}
                <div className="flex flex-col gap-1 mb-4">
                  {mainNavItems.map((item, index) => {
                    const active = isActive(item.path);
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all ${
                            active
                              ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                              : 'text-foreground hover:bg-secondary'
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* More Section */}
                <div className="border-t border-border/50 pt-4 mb-4">
                  <p className="text-xs text-muted-foreground px-4 mb-2">More</p>
                  <div className="grid grid-cols-2 gap-2">
                    {moreItems.map((item, index) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + index * 0.03 }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-center transition-all ${
                              active
                                ? 'bg-primary/10 text-primary border border-primary/30'
                                : 'bg-muted/30 hover:bg-muted/50'
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="text-xs font-medium">{item.name}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Resume & Contact */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 pt-4 border-t border-border"
                >
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsResumeOpen(true);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Resume
                  </Button>
                  <Button asChild className="w-full rounded-xl glow">
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Let's Work Together
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Resume Preview Modal */}
      <ResumePreview isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};