import { projects } from "@/data/projects";

export interface Review {
  quote: string;
  author: string;
  role: string;
  rating: number;
  source: "Portfolio" | "Fiverr";
  projectId?: string;
}

/**
 * Real Fiverr reviews (copied from the explainerace profile). They appear first on the
 * homepage review wall, followed by testimonials published on the case-study pages.
 * Quotes are verbatim; one long review is cut off with an ellipsis, as shown on Fiverr.
 */
export const fiverrReviews: Review[] = [
  { quote: "Thanks, appreciate the revisions to nail our messaging and vision! Great job!", author: "getfitrx", role: "United States \u00b7 Fiverr buyer", rating: 4.7, source: "Fiverr" },
  { quote: "great work", author: "midonagar", role: "Egypt \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Perfect KYC Walkthrough Video Best if best! Ali delivered a perfect walkthrough video for my Buying group website's KYC process. It's clear, professional, and exactly what I needed. Highly recommend!", author: "ericroan457", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Hands down the best experience on Fiverr. Ali created the perfect walkthrough video for my Webflex project. It's exactly what I needed- professional, polished, and delivered quickly. Best if best. Highly recommended", author: "mirabellaclaire", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Great experience overall. The screen recording was sharp, the background music fit perfectly, and the on-screen highlights made the app flow simple to understand. Communication was clear, and the 3-day delivery was spot on.", author: "michaelgencare", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "I hired this seller to record an HD screencast explainer for my mobile app, and the final video came out really clean and professional. The instructions were easy to follow, the screen recording quality was sharp, and everything was explained clearly without feeling rushed. Communication was smooth and…", author: "megan_galla", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Ali surpassed my expectations with his meticulous work, delivered better than my vision.", author: "pay_mint", role: "Canada \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Outstanding work by the seller.", author: "valintine654", role: "United Kingdom \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Absolutely Amazing work! Pro Screencast service by Ali. Highly recommended!!", author: "valintine654", role: "United Kingdom \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Excellent screencast video editor! I hired him to create a screencast video and he delivered exactly what I was looking for. Great attention to detail, fast delivery, and not a single revision was needed. I will definitely hire him again for my upcoming videos. Thanks, Ali — highly recommended!", author: "brandonknoxq", role: "Canada \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Ali did exactly what I was looking for — a perfect screencast video. Delivered on time and very professional. Highly recommended!", author: "silasemmettg", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Excellent work, I hired Ali to make an intro and instructional video for Nuralab, and he did an amazing job. The video looked professional, was clear and easy to follow, and matched exactly what I had in mind. Great communication and delivered on time — highly recommend!", author: "jerryrohand", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Ali delivered an OUTSTANDING screencast app video. His storytelling and creativity shone through, exceeding all expectations. Working with him was a breeze, thanks to his proactive communication and deep understanding—he genuinely went above and beyond. 🙌", author: "michaeljohn780", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Ali truly SHINED in delivering top-notch screencasting videos! His work was visually appealing and showcased real professionalism with compelling storytelling. Partnering with Ali was a pleasure, thanks to his cooperative spirit, fluency, and quick responses. 👍", author: "michaeljohn780", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Ali Hamza truly delivered an EXCEPTIONAL experience in the realm of App tutorial video. His storytelling prowess, coupled with a keen attention to details, exceeded all expectations. Collaborating with him was a breeze, thanks to his language fluency and swift responsiveness. I will hire him again for next videos. Highly Recommended! 😊", author: "lyla786", role: "United Kingdom \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Absolutely perfect Screencast Video! I’ll definitely be hiring him again!", author: "katherine7y", role: "United States \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "I hired him for the second time, and once again, the experience was flawless. His attention to detail, clear communication, and high-quality work made the entire process smooth and efficient. if you are looking a perfect screencast video, hire Him. Highly recommended!", author: "madisonqf", role: "Canada \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
  { quote: "Ali did an absolutely splendid job creating a tutorial video for my app! His communication was prompt and clear throughout the entire process to create video. I’m really impressed with the quality of his work and attention to detail – highly recommend!", author: "madisonqf", role: "Canada \u00b7 Fiverr buyer", rating: 5, source: "Fiverr" },
];

const projectReviews: Review[] = projects.flatMap((p) => {
  const t = p.caseStudy?.testimonial;
  if (!t) return [];
  return [
    {
      quote: t.quote,
      author: t.author,
      role: t.role,
      rating: Math.round(parseFloat(t.rating) || 5),
      source: "Portfolio" as const,
      projectId: p.id,
    },
  ];
});

export const reviews: Review[] = [...fiverrReviews, ...projectReviews];
