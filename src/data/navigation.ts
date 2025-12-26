/**
 * Navigation Configuration
 * Centralized navigation items for header, footer, and mobile menu
 */

import type { NavItem } from './types';

// ==========================================
// MAIN NAVIGATION
// ==========================================

export const mainNavItems: NavItem[] = [
  { name: 'Home', path: '/', description: 'Welcome to my portfolio' },
  { name: 'About', path: '/about', description: 'Learn more about me' },
  { name: 'Projects', path: '/projects', description: 'View my work' },
  { name: 'Blog', path: '/blog', description: 'Technical articles' },
  { name: 'Ask AI', path: '/ask-ai', description: 'Chat with AI about me' },
  { name: 'Coding', path: '/coding', description: 'Practice coding challenges' },
  { name: 'Games', path: '/games', description: 'Play interactive games' },
  { name: 'Contact', path: '/contact', description: 'Get in touch' },
];

// ==========================================
// FOOTER NAVIGATION
// ==========================================

export const footerNavItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

// ==========================================
// QUICK LINKS (for command palette, sitemap, etc.)
// ==========================================

export const quickLinks: NavItem[] = [
  { name: 'View Projects', path: '/projects' },
  { name: 'About Me', path: '/about' },
  { name: 'Ask AI', path: '/ask-ai' },
  { name: 'Get in Touch', path: '/contact' },
  { name: 'Play Games', path: '/games' },
  { name: 'Coding Challenges', path: '/coding' },
];

// ==========================================
// EXTERNAL LINKS
// ==========================================

export interface ExternalLink {
  name: string;
  url: string;
  description?: string;
}

export const externalLinks: ExternalLink[] = [
  { 
    name: 'GitHub', 
    url: 'https://github.com', 
    description: 'View my repositories' 
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com', 
    description: 'Connect with me' 
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com', 
    description: 'Follow me on Twitter' 
  },
];
