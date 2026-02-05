import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText, Gamepad2, BookOpen, Code2, Wrench, Brain, PlayCircle, Terminal } from 'lucide-react';
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

const mainNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Playground', path: '/playground', icon: PlayCircle },
  { name: 'Challenges', path: '/coding', icon: Code2 },
  { name: 'Blog', path: '/blog', icon: BookOpen },
];

const moreItems = [
  { name: 'Snippets', path: '/snippets', icon: FileText, description: 'Useful code snippets' },
  { name: 'Resources', path: '/resources', icon: Wrench, description: 'Tools & resources' },
  { name: 'Games', path: '/games', icon: Gamepad2, description: 'Fun mini-games' },
  { name: 'Ask AI', path: '/ask-ai', icon: Brain, description: 'AI-powered Q&A' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <nav className="container mx-auto px-4 md:px-6">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'glass-card rounded-2xl px-6 py-3 shadow-lg border border-border/30'
                : 'px-2 py-2'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="relative group z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                  <Terminal className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="hidden sm:block text-xl font-bold gradient-text">
                  DevHub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="flex items-center gap-1 p-1.5 rounded-full bg-secondary/80 backdrop-blur-md border border-border/50">
                {/* Main Nav Items */}
                {mainNavItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link key={item.path} to={item.path} className="relative">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative z-10 ${
                          active
                            ? 'text-primary-foreground bg-gradient-to-r from-primary to-accent'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.name}
                      </div>
                    </Link>
                  );
                })}

                {/* More Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      More
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="center" 
                    className="w-56 p-2 glass-card border-border/50 rounded-2xl shadow-2xl"
                    sideOffset={12}
                  >
                    <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                      More Features
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
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <div className="hidden md:block">
                <Button asChild size="sm" className="rounded-full px-5">
                  <Link to="/playground">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Coding
                  </Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full bg-secondary/80"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-24 left-4 right-4 z-50 lg:hidden max-h-[calc(100vh-120px)] overflow-auto">
            <div className="glass-card rounded-3xl p-6 border border-border/50 shadow-2xl">
              {/* Main Links */}
              <div className="flex flex-col gap-1 mb-4">
                {mainNavItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
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
                  );
                })}
              </div>

              {/* More Section */}
              <div className="border-t border-border/50 pt-4 mb-4">
                <p className="text-xs text-muted-foreground px-4 mb-2">More</p>
                <div className="grid grid-cols-2 gap-2">
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
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
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-border">
                <Button asChild className="w-full rounded-xl">
                  <Link to="/playground" onClick={() => setIsMenuOpen(false)}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Coding
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
