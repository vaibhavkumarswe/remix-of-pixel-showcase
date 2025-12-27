/**
 * Personal Information
 * Developer bio and personal details
 */

import type { PersonalInfo, FAQItem } from './types';

// ==========================================
// PERSONAL INFO
// ==========================================

export const personalInfo: PersonalInfo = {
  name: 'Vaibhav Kumar',
  title: 'Senior Software Engineer',
  tagline: 'Crafting digital experiences with code & creativity',
  email: 'vaibhavkumarswe@gmail.com',
  location: 'Hyderabad, IN',
  availability: 'Open to opportunities',
  resumeUrl: '/resume.pdf',
};

// ==========================================
// BIO SECTIONS
// ==========================================

export const bio = {
  short: "I'm a passionate full-stack developer with expertise in React, TypeScript, and modern web technologies.",
  
  medium: "I'm a passionate full-stack developer specializing in building exceptional digital experiences. With years of experience in React, TypeScript, and Node.js, I create scalable, performant, and beautiful web applications.",
  
  long: `I'm a passionate full-stack developer with a deep love for crafting exceptional digital experiences. 
  With over 5 years of experience in the tech industry, I specialize in building scalable, performant, 
  and beautiful web applications using modern technologies like React, TypeScript, and Node.js.
  
  My journey in tech started with a curiosity about how things work on the web, and it has evolved 
  into a career dedicated to pushing the boundaries of what's possible in web development.
  
  When I'm not coding, you can find me contributing to open-source projects, writing technical 
  articles, or exploring the latest advancements in AI and web technologies.`,
};

// ==========================================
// STATISTICS
// ==========================================

export const stats = {
  yearsExperience: 5,
  projectsCompleted: 50,
  happyClients: 30,
  linesOfCode: '500K+',
  coffeeConsumed: '∞',
  openSourceContributions: 100,
};

// ==========================================
// EXPERIENCE TIMELINE
// ==========================================

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    company: 'TechCorp',
    period: '2022 - Present',
    description: 'Leading frontend development for enterprise applications, mentoring junior developers, and establishing best practices.',
    technologies: ['React', 'TypeScript', 'GraphQL', 'AWS'],
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2020 - 2022',
    description: 'Built and maintained full-stack applications, implemented CI/CD pipelines, and collaborated with cross-functional teams.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'AgencyABC',
    period: '2018 - 2020',
    description: 'Developed responsive web applications for various clients, focusing on performance and accessibility.',
    technologies: ['JavaScript', 'Vue.js', 'SASS', 'Webpack'],
  },
];

// ==========================================
// FAQ
// ==========================================

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'I offer full-stack web development, frontend development, UI/UX implementation, performance optimization, and technical consulting.',
    category: 'services',
  },
  {
    id: 2,
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on complexity. A simple landing page might take 1-2 weeks, while a full web application could take 2-3 months.',
    category: 'process',
  },
  {
    id: 3,
    question: 'Do you work with international clients?',
    answer: 'Yes! I work with clients worldwide and am comfortable with remote collaboration across different time zones.',
    category: 'general',
  },
  {
    id: 4,
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in React, TypeScript, Next.js, Node.js, and modern CSS frameworks like Tailwind. I also have experience with Vue.js and various backend technologies.',
    category: 'technical',
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getFAQByCategory = (category: string): FAQItem[] => {
  return faqItems.filter(item => item.category === category);
};
