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
 * Add real Fiverr reviews here (source: "Fiverr"). They appear first on the
 * homepage review wall. Until then the wall shows client testimonials already
 * published on the case-study pages.
 */
export const fiverrReviews: Review[] = [];

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
