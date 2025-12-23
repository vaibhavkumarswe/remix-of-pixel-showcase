import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home,
  User,
  FolderKanban,
  Gamepad2,
  Code,
  Mail,
  Sun,
  Moon,
  Github,
  Linkedin,
  Twitter,
  Terminal,
  Download,
  Search,
  Sparkles,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/themeSlice';

interface CommandPaletteProps {
  onOpenTerminal?: () => void;
}

export const CommandPalette = ({ onOpenTerminal }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const pages = [
    { name: 'Home', path: '/', icon: Home, keywords: ['home', 'main', 'start'] },
    { name: 'About', path: '/about', icon: User, keywords: ['about', 'bio', 'me', 'experience'] },
    { name: 'Projects', path: '/projects', icon: FolderKanban, keywords: ['projects', 'work', 'portfolio'] },
    { name: 'Games', path: '/games', icon: Gamepad2, keywords: ['games', 'fun', 'play'] },
    { name: 'Coding Challenges', path: '/coding', icon: Code, keywords: ['coding', 'challenges', 'practice'] },
    { name: 'Contact', path: '/contact', icon: Mail, keywords: ['contact', 'email', 'message'] },
  ];

  const actions = [
    {
      name: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? Sun : Moon,
      action: () => dispatch(toggleTheme()),
      keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
    },
    {
      name: 'Open Terminal',
      icon: Terminal,
      action: () => onOpenTerminal?.(),
      keywords: ['terminal', 'console', 'cli', 'command'],
    },
    {
      name: 'Download Resume',
      icon: Download,
      action: () => {
        // Would trigger resume download
        console.log('Downloading resume...');
      },
      keywords: ['resume', 'cv', 'download', 'pdf'],
    },
  ];

  const socials = [
    { name: 'GitHub', icon: Github, href: 'https://github.com', keywords: ['github', 'code', 'repo'] },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', keywords: ['linkedin', 'professional'] },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', keywords: ['twitter', 'social', 'x'] },
  ];

  return (
    <>
      {/* Trigger hint */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full glass-card border border-border/50 hover:border-primary/50 transition-all group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-sm text-muted-foreground">Quick actions</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-secondary rounded text-xs font-mono text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </motion.button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />

            {/* Command Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
            >
              <Command className="rounded-2xl border border-border shadow-2xl overflow-hidden">
                <div className="flex items-center border-b border-border px-4">
                  <Sparkles className="h-4 w-4 text-primary mr-2" />
                  <CommandInput 
                    placeholder="Type a command or search..." 
                    className="h-14 text-base"
                  />
                </div>
                <CommandList className="max-h-[400px] overflow-y-auto p-2">
                  <CommandEmpty>No results found.</CommandEmpty>
                  
                  <CommandGroup heading="Navigation">
                    {pages.map((page) => (
                      <CommandItem
                        key={page.path}
                        value={page.name + ' ' + page.keywords.join(' ')}
                        onSelect={() => runCommand(() => navigate(page.path))}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
                      >
                        <div className={`p-1.5 rounded-md ${location.pathname === page.path ? 'bg-primary/20' : 'bg-secondary'}`}>
                          <page.icon className={`h-4 w-4 ${location.pathname === page.path ? 'text-primary' : ''}`} />
                        </div>
                        <span>{page.name}</span>
                        {location.pathname === page.path && (
                          <span className="ml-auto text-xs text-primary">Current</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator className="my-2" />

                  <CommandGroup heading="Actions">
                    {actions.map((action) => (
                      <CommandItem
                        key={action.name}
                        value={action.name + ' ' + action.keywords.join(' ')}
                        onSelect={() => runCommand(action.action)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
                      >
                        <div className="p-1.5 rounded-md bg-secondary">
                          <action.icon className="h-4 w-4" />
                        </div>
                        <span>{action.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator className="my-2" />

                  <CommandGroup heading="Social">
                    {socials.map((social) => (
                      <CommandItem
                        key={social.name}
                        value={social.name + ' ' + social.keywords.join(' ')}
                        onSelect={() => runCommand(() => window.open(social.href, '_blank'))}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
                      >
                        <div className="p-1.5 rounded-md bg-secondary">
                          <social.icon className="h-4 w-4" />
                        </div>
                        <span>{social.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">↗</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                
                <div className="border-t border-border p-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-secondary rounded">↵</kbd> Select
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-secondary rounded">↑↓</kbd> Navigate
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-secondary rounded">Esc</kbd> Close
                  </span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
