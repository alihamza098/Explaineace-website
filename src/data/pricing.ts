export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceUnit?: string;
  discountNote?: string;
  duration: string;
  popular?: boolean;
  description: string;
  idealFor: string;
  features: string[];
  turnaround: string;
  revisions: string;
  ctaText: string;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "simple-screencast",
    name: "Simple Screencast Tutorial",
    price: "$120",
    priceUnit: "per 60 seconds",
    discountNote: "Inbox / DM for special discounts on longer projects & batch video orders",
    duration: "60 seconds base (scales per min)",
    description:
      "A clean, straightforward high-resolution screencast tutorial with no fancy animations. Focused on pure instruction, ease of following, and fast turnaround.",
    idealFor: "Knowledge base guides, SOPs, step-by-step tutorials, basic feature announcements",
    features: [
      "Native 1080p / 4K crisp screen recording",
      "No fancy animation — clean, focused instructional flow",
      "Clear studio-grade voiceover narration sync",
      "Essential focal zooms on important buttons & fields",
      "Clean audio mastering & subtle background track",
      "Full commercial broadcast & YouTube rights",
      "Bulk discount available for multi-video series",
    ],
    turnaround: "24 – 48 Hours",
    revisions: "2 Rounds included",
    ctaText: "Get $120 Screencast",
  },
  {
    id: "fancy-saas-explainer",
    name: "Fancy SaaS Explainer",
    price: "$220",
    priceUnit: "per 60 seconds",
    popular: true,
    badge: "Most Popular",
    duration: "60 seconds base (scales per min)",
    discountNote: "Custom bundle rates available for multi-minute walkthroughs",
    description:
      "High-production SaaS product walkthrough featuring dynamic camera zooms, smooth cursor tracking, click ripples, and sleek UI framing that elevate your software.",
    idealFor: "SaaS homepage demos, product marketing tours, onboarding series, investor decks",
    features: [
      "Dynamic focal pan & 3D zooms on key product actions",
      "Cursor smoothing & click ripple accent effects",
      "Sleek UI framing, background depth & spotlight overlays",
      "Studio voiceover narration & sound design mix",
      "Branded intro card & logo outro animation",
      "Full commercial rights & 4K master delivery",
      "Timed chapter timestamps for YouTube or web embeds",
    ],
    turnaround: "48 – 72 Hours",
    revisions: "2 Rounds included",
    ctaText: "Order $220 Walkthrough",
  },
  {
    id: "ai-product-ugc-ads",
    name: "AI Product & UGC Ads",
    price: "$200 – $300",
    priceUnit: "per short ad video",
    badge: "New & High CTR",
    duration: "15s – 60s short-form ad",
    discountNote: "Volume packages available for 3x / 5x / 10x creative test batches",
    description:
      "High-impact AI-powered UGC creators and hyper-realistic product advertisements built to drive high CTR and conversions on social feeds.",
    idealFor: "TikTok Ads, Meta (Instagram/Facebook) Reels, YouTube Shorts, DTC & SaaS paid campaigns",
    features: [
      "Hyper-realistic AI UGC creator avatars & talking heads",
      "Dynamic 3D product motion & AI visual enhancements",
      "High-converting 3-second hook variations",
      "Viral-style kinetic captions, sound effects & emojis",
      "9:16 vertical & 16:9 landscape export options",
      "Script copywriting & marketing hook strategy included",
      "100% ad-whitelisting & full commercial usage",
    ],
    turnaround: "48 – 72 Hours",
    revisions: "2 Rounds included",
    ctaText: "Create AI UGC Ads",
  },
  {
    id: "custom-ui-motion-explainer",
    name: "Custom UI Motion Explainer",
    price: "$800 – $1,200",
    priceUnit: "per project (scope-dependent)",
    badge: "Enterprise",
    duration: "60s – 90s+ custom scope",
    discountNote: "Final price depends on animation complexity, asset design & total duration",
    description:
      "Bespoke SaaS explainer video built with custom UI-style motion graphics, vector UI reconstructions, and cinematic transitions for maximum conversion.",
    idealFor: "High-stakes SaaS launches, homepage hero explainers, venture pitch decks, Product Hunt #1 campaigns",
    features: [
      "Custom 2D/3D UI motion graphics & vector UI recreation",
      "Abstract software architecture & workflow animations",
      "Complete storyboard & visual concept development",
      "Premium voiceover artist selection (accents & styles)",
      "Custom sound design (SFX), swooshes & sonic branding",
      "Multi-format delivery (16:9 widescreen, 9:16 vertical)",
      "Unlimited revisions during milestone staging phases",
      "Full intellectual property & source file handoff",
    ],
    turnaround: "5 – 8 Days",
    revisions: "Milestone-based rounds",
    ctaText: "Inquire for Custom UI",
  },
];

export const pricingFaqs = [
  {
    q: "How does your pricing work?",
    a: "We offer transparent, upfront rates: $120 per 60s for simple screencasts, $220 per 60s for fancy SaaS walkthroughs with dynamic zooms, $200–$300 per short AI product/UGC ad, and $800–$1,200 for custom UI motion graphics explainers. Longer projects and batch orders qualify for special volume discounts—simply inbox us to discuss!",
  },
  {
    q: "Can I get a discount on longer or multi-video projects?",
    a: "Absolutely! For videos over 2 minutes or recurring batches (such as full help center academies or multiple UGC ad hooks), message us directly on WhatsApp or email for custom volume pricing.",
  },
  {
    q: "What is included in the new AI UGC and AI Product Video service?",
    a: "Our AI UGC service combines hyper-realistic AI creators/avatars, AI-enhanced product motion, dynamic kinetic captions, and high-converting marketing hooks optimized for TikTok, Instagram Reels, and YouTube Shorts. We handle scripting, avatar creation, audio, and final edits.",
  },
  {
    q: "How do we handle payment safely?",
    a: "You have 4 safe options: Upwork Direct Contract (0% buyer marketplace fee, full escrow protection), Payoneer business invoice, direct international bank transfer, or our vetted Fiverr Level 2 profiles.",
  },
  {
    q: "What do you need from me to get started?",
    a: "For screencasts and walkthroughs, access to a demo/test account, a bulleted list of features to highlight, and your brand assets. For AI UGC and product ads, your website URL, product images, and target angle.",
  },
  {
    q: "Are revisions included?",
    a: "Yes! Every standard project includes 2 dedicated revision rounds to tweak pacing, zooms, callouts, or audio balance. Custom UI motion projects include milestone approvals at each production phase.",
  },
];
