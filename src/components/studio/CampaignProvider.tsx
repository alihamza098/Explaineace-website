"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  estimate,
  packageById,
  publishingById,
  type Estimate,
  type PackageId,
  type PublishingId,
} from "@/data/packages";
import { events, trackEvent } from "@/lib/analytics";

interface CampaignState {
  packageId: PackageId;
  publishingId: PublishingId;
  /** True once the visitor (or a ?package= link) actively chose a package. */
  packageChosen: boolean;
  estimate: Estimate;
  /** Select a package from a card: prefill, scroll to the inquiry, focus it. */
  choosePackage: (id: PackageId, source: string) => void;
  /** Change the package from inside the inquiry (no scroll). */
  setPackage: (id: PackageId, source: string) => void;
  setPublishing: (id: PublishingId, source: string) => void;
}

const Ctx = createContext<CampaignState | null>(null);

export function useCampaign() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCampaign must be used inside <CampaignProvider>");
  return c;
}

export const INQUIRY_ID = "inquiry";

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packageId, setPackageId] = useState<PackageId>("product-launch");
  const [publishingId, setPublishingId] = useState<PublishingId>("self");
  const [packageChosen, setPackageChosen] = useState(false);

  // Deep links: /?package=product-launch&publishing=launch#inquiry
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = packageById(q.get("package"));
    const o = publishingById(q.get("publishing"));
    if (p) {
      setPackageId(p.id);
      setPackageChosen(true);
    }
    if (o) setPublishingId(o.id);
  }, []);

  const setPackage = useCallback((id: PackageId, source: string) => {
    setPackageId(id);
    setPackageChosen(true);
    trackEvent(events.packageSelect, { package: id, source });
  }, []);

  const setPublishing = useCallback((id: PublishingId, source: string) => {
    setPublishingId(id);
    trackEvent(events.publishingSelect, { publishing: id, source });
  }, []);

  const choosePackage = useCallback(
    (id: PackageId, source: string) => {
      setPackage(id, source);
      const el = document.getElementById(INQUIRY_ID);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${INQUIRY_ID}`);
      const heading = el.querySelector<HTMLElement>("[data-inquiry-heading]");
      window.setTimeout(() => heading?.focus({ preventScroll: true }), reduce ? 0 : 450);
    },
    [setPackage],
  );

  const value = useMemo<CampaignState>(
    () => ({
      packageId,
      publishingId,
      packageChosen,
      estimate: estimate(packageId, publishingId),
      choosePackage,
      setPackage,
      setPublishing,
    }),
    [packageId, publishingId, packageChosen, choosePackage, setPackage, setPublishing],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
