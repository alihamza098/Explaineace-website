"use client";

import React, { useState } from "react";
import { Copy, Mail, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";
import {
  buildBriefText,
  fileMath,
  packageById,
  packages,
  publishingById,
  publishingOptions,
} from "@/data/packages";
import { siteConfig } from "@/data/siteConfig";
import { events, trackEvent } from "@/lib/analytics";
import { INQUIRY_ID, useCampaign } from "./CampaignProvider";

const field =
  "w-full rounded-xl border border-paper/15 bg-ink px-4 py-3 text-base text-paper placeholder:text-paper-mute focus:border-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/60";
const label = "mb-1.5 block text-sm font-medium text-paper";

type Status = "idle" | "draft-opened" | "copied" | "invalid";

/**
 * The inquiry. There is no verified form backend for this flow, so the honest
 * outcomes are "Open email draft" (mailto to the studio address) or WhatsApp.
 * "Sent" is never claimed: after opening a draft the visitor is told the
 * message is only sent when they press send in their mail app.
 */
export const InquiryBuilder: React.FC = () => {
  const { packageId, publishingId, estimate, setPackage, setPublishing } = useCampaign();
  const [product, setProduct] = useState("");
  const [outcome, setOutcome] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const pkg = packageById(packageId)!;
  const pub = publishingById(publishingId)!;

  const brief = buildBriefText({ packageId, publishingId, product, outcome, targetDate, name, email });
  const subject = `Project inquiry: ${pkg.name} + ${pub.label} (${estimate.display})`;
  const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;
  const whatsapp = `https://wa.me/${siteConfig.whatsapp.number.replace("+", "")}?text=${encodeURIComponent(
    `Hi Ali, I'm interested in ${pkg.name} (${estimate.display}) with "${pub.label}". Product: ${product || "to be shared"}.`,
  )}`;

  const missing = !product.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim());

  const openDraft = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (missing) {
      setStatus("invalid");
      return;
    }
    trackEvent(events.emailDraftOpened, { package: packageId, publishing: publishingId });
    window.location.href = mailto;
    setStatus("draft-opened");
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${siteConfig.contactEmail}\nSubject: ${subject}\n\n${brief}`);
      setStatus("copied");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
      <form onSubmit={openDraft} noValidate className="space-y-8" aria-describedby="inquiry-status">
        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-paper">1. Production package</legend>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Production package">
            {packages.map((p) => {
              const on = p.id === packageId;
              return (
                <label
                  key={p.id}
                  className={`flex min-h-[44px] cursor-pointer flex-col rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-lime ${
                    on ? "border-lime bg-lime/[0.06]" : "border-paper/10 bg-ink-2 hover:border-paper/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={p.id}
                    checked={on}
                    onChange={() => setPackage(p.id, "inquiry")}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold text-paper">{p.name}</span>
                  <span className="mt-0.5 text-lg font-semibold text-lime">${p.price}</span>
                  <span className="mt-1 text-xs text-paper-mute">{p.totalFiles} finished files</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-paper">2. Who hits publish?</legend>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Publishing preference">
            {publishingOptions.map((o) => {
              const on = o.id === publishingId;
              return (
                <label
                  key={o.id}
                  className={`flex min-h-[44px] cursor-pointer flex-col rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-lime ${
                    on ? "border-lime bg-lime/[0.06]" : "border-paper/10 bg-ink-2 hover:border-paper/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="publishing"
                    value={o.id}
                    checked={on}
                    onChange={() => setPublishing(o.id, "inquiry")}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold text-paper">{o.label}</span>
                  <span className="mt-0.5 text-lg font-semibold text-lime">{o.priceLabel}</span>
                  <span className="mt-1 text-xs text-paper-mute">{o.id === "self" ? "You post the files" : "We post for you"}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-5">
          <p className="text-sm font-semibold text-paper">3. A short brief</p>
          <div>
            <label htmlFor="inq-product" className={label}>
              Product name or URL <span className="text-lime">*</span>
            </label>
            <input
              id="inq-product"
              className={field}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. acme.app"
              autoComplete="off"
              aria-invalid={touched && !product.trim()}
            />
          </div>
          <div>
            <label htmlFor="inq-outcome" className={label}>
              What should viewers understand or do after watching?
            </label>
            <textarea
              id="inq-outcome"
              className={`${field} min-h-[96px]`}
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="e.g. Understand the new reporting feature and start a free trial."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="inq-date" className={label}>
                Target date <span className="text-paper-mute">(if known)</span>
              </label>
              <input
                id="inq-date"
                type="date"
                className={field}
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inq-name" className={label}>
                Your name
              </label>
              <input
                id="inq-name"
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="inq-email" className={label}>
              Your email, so Ali can reply <span className="text-lime">*</span>
            </label>
            <input
              id="inq-email"
              type="email"
              className={field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              aria-invalid={touched && (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim()))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-lime px-7 text-sm font-semibold text-lime-ink transition-colors hover:bg-[#d6ff4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <Mail className="h-4 w-4" aria-hidden /> Open email draft
          </button>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(events.whatsappClick, { package: packageId, publishing: publishingId })}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-paper/25 px-7 text-sm font-semibold text-paper transition-colors hover:border-lime hover:text-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
          >
            <WhatsAppIcon className="h-4 w-4" /> Message on WhatsApp
          </a>
        </div>

        <div id="inquiry-status" role="status" aria-live="polite" className="min-h-[3.5rem] text-sm">
          {status === "invalid" && (
            <p className="text-[#ffb4a2]">
              Add your product name or URL and a valid email so Ali has something to reply to.
            </p>
          )}
          {status === "draft-opened" && (
            <p className="text-paper-dim">
              <strong className="text-paper">Your email app should now show a draft addressed to {siteConfig.contactEmail}.</strong>{" "}
              Nothing has been sent yet — it only goes out when you press send there. No mail app opened?{" "}
              <button type="button" onClick={copyBrief} className="underline hover:text-lime">
                Copy the brief
              </button>{" "}
              or use WhatsApp.
            </p>
          )}
          {status === "copied" && (
            <p className="flex items-center gap-2 text-paper-dim">
              <Check className="h-4 w-4 text-lime" aria-hidden /> Brief copied. Paste it into an email to {siteConfig.contactEmail}.
            </p>
          )}
        </div>
      </form>

      {/* Live estimate */}
      <aside
        aria-label="Your estimate"
        className="rounded-2xl border border-lime/40 bg-ink-2 p-6 sm:p-7 lg:sticky lg:top-28"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper-mute">Your estimate</p>
        <p data-testid="estimate-display" className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-paper" aria-live="polite">
          {estimate.display}
        </p>
        <p data-testid="estimate-summary" className="mt-2 text-sm text-paper-dim">
          {estimate.summary}
        </p>
        <dl className="mt-5 space-y-2 border-t border-paper/10 pt-5 text-sm">
          {estimate.breakdown.map((b) => (
            <div key={b.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-paper-dim">{b.label}</dt>
              <dd className="text-right font-medium text-paper">{b.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-xl bg-ink p-4 text-sm text-paper-dim">
          <p className="font-medium text-paper">{pkg.headline}</p>
          <p className="mt-1">{fileMath(pkg)}.</p>
          <p className="mt-1">Estimated turnaround: {pkg.turnaround}.</p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-paper-mute">
          An estimate, not an invoice. Original 3D production, extensive UI reconstruction and additional scripts are
          scoped separately. Ali confirms scope and timing by email before any work starts.
        </p>
      </aside>
    </div>
  );
};

export { INQUIRY_ID };
