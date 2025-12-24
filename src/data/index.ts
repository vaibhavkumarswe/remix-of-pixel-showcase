/**
 * Data Layer - Main Index
 * 
 * Central export point for all data files.
 * Import from '@/data' instead of individual files.
 */

// Types
export * from './types';

// Navigation
export { mainNavItems, footerNavItems, quickLinks, externalLinks } from './navigation';

// Social
export { socialLinks, allSocialPlatforms, contactInfo } from './social';

// Skills
export { 
  skills, 
  technologies, 
  skillsByCategory, 
  radarSkillsData,
  getSkillsByCategory,
  getTechnologiesByCategory,
  getAllTechnologyNames,
} from './skills';

// Testimonials
export { 
  testimonials, 
  getFeaturedTestimonials,
  getTestimonialById,
  getAverageRating,
  getTotalTestimonials,
} from './testimonials';

// Process
export { 
  processSteps, 
  extendedProcessSteps,
  getProcessStepById,
  getTotalSteps,
} from './process';

// Personal
export { 
  personalInfo, 
  bio, 
  stats, 
  experience,
  faqItems,
  getFAQByCategory,
} from './personal';

// Challenges
export { 
  challenges,
  languageLabels,
  languageColors,
  languageDescriptions,
  difficultyLabels,
  difficultyColors,
  categoryLabels,
  getChallengeById,
  getChallengesByLanguage,
  getChallengesByDifficulty,
  getChallengesByCategory,
  getChallengeCounts,
  getTotalChallenges,
  searchChallenges,
  javascriptChallenges,
  typescriptChallenges,
  reactChallenges,
} from './challenges/index';
