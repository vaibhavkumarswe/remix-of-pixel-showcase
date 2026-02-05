import { useRef } from 'react';
import { Github, Twitter, Mail, ArrowUpRight, Heart, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-foreground' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: Mail, href: '#', label: 'Email', color: 'hover:text-primary' },
];

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Home', path: '/' },
      { name: 'Playground', path: '/playground' },
      { name: 'Challenges', path: '/coding' },
      { name: 'Blog', path: '/blog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Snippets', path: '/snippets' },
      { name: 'Tools', path: '/resources' },
      { name: 'Games', path: '/games' },
      { name: 'Ask AI', path: '/ask-ai' },
    ],
  },
];

export const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer 
      ref={footerRef}
      className="relative border-t border-border overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30 pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold gradient-text">DevHub</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Your one-stop developer platform. Learn, practice, and build with coding challenges, 
              tutorials, and a powerful playground.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`p-3 rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              © {new Date().getFullYear()} DevHub. Made with
              <Heart className="w-4 h-4 text-destructive fill-destructive" />
              & React
            </p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Open Source Platform</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
