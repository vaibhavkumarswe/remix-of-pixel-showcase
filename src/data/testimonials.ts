/**
 * Testimonials Data
 * Client testimonials and reviews
 */

import type { Testimonial } from "./types";

// ==========================================
// TESTIMONIALS
// ==========================================

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ashish Dhagat",
    role: "Assistant Consultant",
    company: "TCS",
    avatar: "👨‍💻",
    content:
      "Vaibhav is an exceptional technical leader who I had the pleasure of working with on mutiple projects. Their deep technical expertise, combined with their leadership skills, made a significant impact on the success of our project. They have an unparalleled ability to break down complex technical challenges, propose effective solutions, and guide the team through execution smoothly. What I particularly admire about vaibhav is their focus on mentoring team members and fostering a culture of learning and innovation. I highly recommend vaibhav to any organization looking for a strong, forward-thinking technical leader.",
    // rating: 5
  },
  {
    id: 2,
    name: "Safiya Ali",
    role: "Senior Software Engineer",
    company: "ValuesLabs",
    avatar: "👩‍💻",
    content:
      "Having had the pleasure of collaborating with Vaibhav on various projects during our time together, I can attest to his exceptional skills and qualities as a frontend developer. Vaibhav's proficiency in React.js and Tailwind, coupled with his innate problem-solving abilities and quick learning aptitude, consistently impressed me. His dedication to mastering new technologies and his genuine passion for software development make him an invaluable asset to any team. Beyond his technical expertise, Vaibhav's strong communication skills, attentive listening, and adeptness at managing tasks have greatly contributed to our project's successes. ",
    // rating: 5,
  },

  {
    id: 3,
    name: "Prateek Labroo",
    role: "Senior Software Engineer",
    company: "WebileApps",
    avatar: "👨",
    content:
      "Vaibhav is an exceptional frontend developer with a keen eye for detail and a passion for creating seamless user experiences. During our time working together, I was consistently impressed by his ability to translate complex design concepts into clean, efficient code. Vaibhav's expertise in React.js and Tailwind CSS allowed him to build responsive and visually appealing interfaces that not only met but exceeded project requirements. His collaborative approach and willingness to share knowledge made him a valuable asset to our team. I highly recommend Vaibhav for any frontend development role, as he brings both technical proficiency and a genuine enthusiasm for his craft.",
    // rating: 5,
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export const getFeaturedTestimonials = (count: number = 4): Testimonial[] => {
  return testimonials.slice(0, count);
};

export const getTestimonialById = (id: number): Testimonial | undefined => {
  return testimonials.find((t) => t.id === id);
};

export const getAverageRating = (): number => {
  const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
  return total / testimonials.length;
};

export const getTotalTestimonials = (): number => {
  return testimonials.length;
};
