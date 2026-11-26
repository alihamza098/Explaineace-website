/**
 * Single source of truth for campaign packages, publishing options and
 * estimate maths. Every price, inclusion, turnaround and inquiry summary on
 * the site (home, /pricing, inquiry form, email draft) is derived from here.
 */

export type PackageId = "feature-demo" | "product-launch" | "launch-onboarding";
export type PublishingId = "self" | "launch" | "monthly";

export interface CampaignPackage {
  id: PackageId;
  name: string;
  price: number; // USD, one time
  forWho: string;
  featured?: boolean;
  /** Plain-language one-liner shown at the top of the pricing card. */
  headline: string;
  /** Primary video(s) that are produced as landscape masters. */
  masters: { count: number; description: string[] };
  /** Distinct social edits (unique cuts). */
  socialEdits: { count: number; names: string[] };
  /** Formats every social edit is exported in. */
  formats: readonly ["16:9", "1:1", "9:16"];
  /** Landscape masters + social exports (edits x 3 formats). */
  socialExports: number;
  totalFiles: number;
  turnaround: string; // business days
}

const FORMATS = ["16:9", "1:1", "9:16"] as const;

function pkg(p: Omit<CampaignPackage, "formats" | "socialExports" | "totalFiles" | "headline">): CampaignPackage {
  const socialExports = p.socialEdits.count * FORMATS.length;
  return {
    ...p,
    formats: FORMATS,
    socialExports,
    totalFiles: p.masters.count + socialExports,
    headline: "", // filled below
  };
}

const rawPackages: CampaignPackage[] = [
  pkg({
    id: "feature-demo",
    name: "Feature Demo",
    price: 249,
    forWho: "A team releasing one feature or teaching one workflow.",
    masters: {
      count: 1,
      description: ["One 45–60 second narrated walkthrough using real product screens"],
    },
    socialEdits: { count: 2, names: ["Quick tip", "Feature reveal"] },
    turnaround: "4–6 business days",
  }),
  pkg({
    id: "product-launch",
    name: "Product Launch",
    price: 499,
    featured: true,
    forWho: "A founder preparing a launch or major release.",
    masters: {
      count: 1,
      description: ["One 30–45 second screen-led launch promo using your UI and brand assets"],
    },
    socialEdits: { count: 3, names: ["Teaser", "Feature spotlight", "Launch announcement"] },
    turnaround: "7–10 business days",
  }),
  pkg({
    id: "launch-onboarding",
    name: "Launch + Onboarding",
    price: 899,
    forWho: "A team that needs to introduce the product and teach new users how to get started.",
    masters: {
      count: 3,
      description: [
        "One 30–45 second launch promo",
        "Two 45–60 second narrated tutorials",
      ],
    },
    socialEdits: {
      count: 5,
      names: ["Teaser", "Launch announcement", "Feature spotlight", "Quick tip", "Quick tip"],
    },
    turnaround: "10–15 business days",
  }),
];

export const packages: CampaignPackage[] = rawPackages.map((p) => {
  const films =
    p.masters.count === 1
      ? p.id === "feature-demo"
        ? "1 narrated walkthrough"
        : "1 launch film"
      : `${p.masters.count} landscape films`;
  return { ...p, headline: `${films} · ${p.socialEdits.count} social edits · 3 formats per edit.` };
});

export const packageById = (id: string | null | undefined) =>
  packages.find((p) => p.id === id);

/** Plain-language file maths, e.g. "1 landscape master + 9 social exports = 10 finished video files". */
export function fileMath(p: CampaignPackage): string {
  const masters = p.masters.count === 1 ? "1 landscape master" : `${p.masters.count} landscape masters`;
  return `${masters} + ${p.socialExports} social exports = ${p.totalFiles} finished video files`;
}

/** The explanation of unique edits vs exported files. */
export function editsVsFiles(p: CampaignPackage): string {
  return `${p.socialEdits.count} distinct social edits (${p.socialEdits.names.join(", ")}). Each one is exported 3 times — 16:9, 1:1 and 9:16 — so ${p.socialEdits.count} edits become ${p.socialExports} files.`;
}

/** Included in every package. */
export const everyPackageIncludes: string[] = [
  "One product, one language",
  "Two consolidated revision rounds",
  "On-screen captions on the social edits",
  "One draft post caption per distinct edit",
  "A suggested posting order",
];

export const scopedSeparately: string =
  "Original 3D production, extensive UI reconstruction and additional scripts are scoped separately.";

export interface PublishingOption {
  id: PublishingId;
  /** Short label for the radio. */
  label: string;
  /** Who publishes, in unambiguous words. */
  who: string;
  priceLabel: string; // "Included" | "+$99 once" | "+$199/month"
  oneTime: number; // extra one-time dollars
  monthly: number; // recurring dollars per month
  included: string;
}

export const publishingOptions: PublishingOption[] = [
  {
    id: "self",
    label: "Our team will post",
    who: "You post the files yourself. We hand them over ready to publish.",
    priceLabel: "Included",
    oneTime: 0,
    monthly: 0,
    included: "Organized files, draft captions, and suggested posting order",
  },
  {
    id: "launch",
    label: "Publish our launch",
    who: "We post for you over the launch window.",
    priceLabel: "+$99 once",
    oneTime: 99,
    monthly: 0,
    included:
      "Up to 6 organic placements across 2 agreed accounts over 2 weeks, adapted copy, approval calendar, scheduling, and live links",
  },
  {
    id: "monthly",
    label: "Manage monthly posting",
    who: "We keep posting every month.",
    priceLabel: "+$199/month",
    oneTime: 0,
    monthly: 199,
    included:
      "Up to 10 organic placements per month across 2 agreed accounts, a calendar, scheduling, and a performance summary using approved assets",
  },
];

export const publishingById = (id: string | null | undefined) =>
  publishingOptions.find((o) => o.id === id);

export const placementNote =
  "One placement means one post on one account. New video production, paid advertising, and community or inbox management are scoped separately.";

export interface Estimate {
  packageId: PackageId;
  publishingId: PublishingId;
  oneTimeTotal: number;
  monthly: number;
  /** "Product Launch + launch publishing → $598 one time" style line. */
  summary: string;
  /** Short value used in big display: "$598 one time" or "$499 + $199/month". */
  display: string;
  breakdown: { label: string; value: string }[];
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const publishingNames: Record<PublishingId, string> = {
  self: "self-publishing",
  launch: "launch publishing",
  monthly: "monthly publishing",
};

export function estimate(packageId: PackageId, publishingId: PublishingId): Estimate {
  const p = packageById(packageId)!;
  const o = publishingById(publishingId)!;
  const oneTimeTotal = p.price + o.oneTime;
  const monthly = o.monthly;
  const display =
    monthly > 0
      ? `${money(oneTimeTotal)} production + ${money(monthly)}/month`
      : `${money(oneTimeTotal)} one time`;
  const breakdown = [{ label: `${p.name} production`, value: `${money(p.price)} one time` }];
  if (o.oneTime > 0) breakdown.push({ label: "Launch publishing", value: `${money(o.oneTime)} one time` });
  if (monthly > 0) breakdown.push({ label: "Monthly posting", value: `${money(monthly)}/month, recurring` });
  if (o.id === "self") breakdown.push({ label: "You publish the files yourself", value: "Included" });
  return {
    packageId,
    publishingId,
    oneTimeTotal,
    monthly,
    display,
    summary: `${p.name} + ${publishingNames[publishingId]} → ${display}`,
    breakdown,
  };
}

/** Sample posting calendar for Product Launch + launch publishing ($598). */
export interface CalendarEntry {
  when: string;
  day: string;
  edit: string;
  purpose: string;
  placements: { account: string; format: string }[];
}

export const sampleCalendar: CalendarEntry[] = [
  {
    when: "Before launch",
    day: "Day −3",
    edit: "Teaser",
    purpose: "Builds anticipation and points to the launch date.",
    placements: [
      { account: "Account A", format: "9:16" },
      { account: "Account B", format: "1:1" },
    ],
  },
  {
    when: "Launch day",
    day: "Day 0",
    edit: "Launch announcement",
    purpose: "Tells people it is live, with the link.",
    placements: [
      { account: "Account A", format: "16:9" },
      { account: "Account B", format: "1:1" },
    ],
  },
  {
    when: "The following week",
    day: "Day +7",
    edit: "Feature spotlight",
    purpose: "Shows one feature people can try right now.",
    placements: [
      { account: "Account A", format: "9:16" },
      { account: "Account B", format: "1:1" },
    ],
  },
];

export const calendarNote =
  "3 edits × 2 accounts = 6 placements, inside the 6-placement limit and the 2-week window. Dates and formats per account are agreed with you in the approval calendar before anything goes live.";

/** Email draft builder — only the studio's verified address is used. */
export interface BriefInput {
  packageId: PackageId;
  publishingId: PublishingId;
  product: string;
  outcome: string;
  targetDate: string;
  name: string;
  email: string;
}

export function buildBriefText(b: BriefInput): string {
  const p = packageById(b.packageId)!;
  const o = publishingById(b.publishingId)!;
  const e = estimate(b.packageId, b.publishingId);
  const lines = [
    "Hi Ali,",
    "",
    "I'd like to start a project with ExplainerAce.",
    "",
    `Package: ${p.name} (${money(p.price)} · ${fileMath(p)} · ${p.turnaround})`,
    `Publishing: ${o.label} (${o.priceLabel})`,
    `Estimate: ${e.display}`,
    "",
    `Product name or URL: ${b.product || "(not given yet)"}`,
    `What viewers should understand or do after watching: ${b.outcome || "(not given yet)"}`,
    `Target date: ${b.targetDate || "Flexible / not decided"}`,
    "",
    `Name: ${b.name || "(not given yet)"}`,
    `Reply to: ${b.email || "(not given yet)"}`,
  ];
  return lines.join("\n");
}
