/**
 * Navigation Configuration
 * Centralized navigation items for header, footer, and mobile menu
 */

import type { NavItem } from './types';

// ==========================================
// MAIN NAVIGATION
// ==========================================

export const mainNavItems: NavItem[] = [
  { name: 'Home', path: '/', description: 'Developer hub home' },
  { name: 'Playground', path: '/playground', description: 'Code playground IDE' },
  { name: 'Challenges', path: '/coding', description: 'Practice coding challenges' },
  { name: 'Blog', path: '/blog', description: 'Technical articles' },
  { name: 'Snippets', path: '/snippets', description: 'Useful code snippets' },
  { name: 'Resources', path: '/resources', description: 'Tools & resources' },
  { name: 'Games', path: '/games', description: 'Play interactive games' },
  { name: 'Ask AI', path: '/ask-ai', description: 'Chat with AI' },
];

// ==========================================
// FOOTER NAVIGATION
// ==========================================

export const footerNavItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Playground', path: '/playground' },
  { name: 'Challenges', path: '/coding' },
  { name: 'Blog', path: '/blog' },
];

// ==========================================
// QUICK LINKS (for command palette, sitemap, etc.)
// ==========================================

export const quickLinks: NavItem[] = [
  { name: 'Coding Playground', path: '/playground' },
  { name: 'Coding Challenges', path: '/coding' },
  { name: 'Tech Blog', path: '/blog' },
  { name: 'Code Snippets', path: '/snippets' },
  { name: 'Resources', path: '/resources' },
  { name: 'Dev Games', path: '/games' },
  { name: 'Ask AI', path: '/ask-ai' },
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
    description: 'View repositories' 
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com', 
    description: 'Follow for updates' 
  },
];
