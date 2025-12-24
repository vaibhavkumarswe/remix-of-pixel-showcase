/**
 * Testimonials Data
 * Client testimonials and reviews
 */

import type { Testimonial } from './types';

// ==========================================
// TESTIMONIALS
// ==========================================

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow',
    avatar: '👩‍💻',
    content: "Working with this developer was a game-changer. The attention to detail and code quality exceeded our expectations. Our app's performance improved by 40%.",
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Founder',
    company: 'StartupHub',
    avatar: '👨‍💼',
    content: "Exceptional work on our platform redesign. The animations and interactions are smooth, and our users love the new experience. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Lead',
    company: 'DesignCo',
    avatar: '👩‍🎨',
    content: "The best frontend developer I've worked with. Transforms designs into pixel-perfect, accessible, and performant code. A true professional.",
    rating: 5
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Engineering Manager',
    company: 'ScaleAI',
    avatar: '👨‍🔬',
    content: "Delivered a complex dashboard project ahead of schedule. The component architecture is clean and maintainable. Will definitely work together again.",
    rating: 5
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'CEO',
    company: 'GrowthLabs',
    avatar: '👩‍💼',
    content: "Transformed our outdated web presence into a modern, responsive site that truly represents our brand. The attention to UX details was impressive.",
    rating: 5
  },
  {
    id: 6,
    name: 'Alex Rivera',
    role: 'Lead Developer',
    company: 'CodeCraft',
    avatar: '👨‍💻',
    content: "Collaborated seamlessly with our team. Great communication, clean code, and delivered exactly what we needed. A pleasure to work with.",
    rating: 5
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getFeaturedTestimonials = (count: number = 4): Testimonial[] => {
  return testimonials.slice(0, count);
};

export const getTestimonialById = (id: number): Testimonial | undefined => {
  return testimonials.find(t => t.id === id);
};

export const getAverageRating = (): number => {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return total / testimonials.length;
};

export const getTotalTestimonials = (): number => {
  return testimonials.length;
};
