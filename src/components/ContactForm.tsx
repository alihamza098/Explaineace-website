"use client";

import React, { useEffect, useState } from "react";
import { Send, CheckCircle2, Mail } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("sent") === "1") {
        setSent(true);
      }
    }
  }, []);

  const inputClass =
    "w-full rounded-xl bg-surface-subtle border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none transition-colors";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5";

  return (
    <div className="p-7 sm:p-9 rounded-3xl bg-surface-card border border-white/[0.08] shadow-card space-y-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          Quick Inquiry Form
        </span>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Replies within 24 hours
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        Tell me about your project
      </h2>

      {sent ? (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white">Message sent — thank you.</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Your inquiry is on its way to my inbox. Expect a reply within 24 business hours.
              For anything urgent, WhatsApp below is fastest.
            </p>
          </div>
        </div>
      ) : (
        <form
          action="https://formsubmit.co/ali@explainerace.com"
          method="POST"
          className="space-y-4"
        >
          {/* FormSubmit configuration */}
          <input type="hidden" name="_subject" value="New project inquiry from explainerace.com" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://explainerace.com/contact?sent=1" />
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cf-name" className={labelClass}>
                Your name *
              </label>
              <input
                id="cf-name"
                type="text"
                name="name"
                required
                placeholder="Jane Smith"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="cf-email" className={labelClass}>
                Email *
              </label>
              <input
                id="cf-email"
                type="email"
                name="email"
                required
                placeholder="jane@company.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cf-type" className={labelClass}>
                Project type
              </label>
              <select id="cf-type" name="project_type" className={inputClass} defaultValue="SaaS Walkthrough">
                <option value="SaaS Walkthrough">SaaS Walkthrough</option>
                <option value="Screencast Tutorial">Screencast Tutorial</option>
                <option value="Animated Explainer Video">Animated Explainer Video</option>
                <option value="App Demo Video">App Demo Video</option>
                <option value="AI UGC Ads">AI UGC Ads</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="cf-budget" className={labelClass}>
                Budget (optional)
              </label>
              <select id="cf-budget" name="budget" className={inputClass} defaultValue="">
                <option value="">Select a range</option>
                <option value="Under $200">Under $200</option>
                <option value="$200 - $500">$200 – $500</option>
                <option value="$500 - $1,000">$500 – $1,000</option>
                <option value="$1,000+">$1,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cf-message" className={labelClass}>
              Project details *
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              placeholder="Your product URL, what the video should show, target length, and your deadline."
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto py-3.5 px-7 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-glow transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Send Inquiry</span>
            <Send className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400">
            Submissions go straight to ali@explainerace.com. No account, no spam list — your
            details are only used to reply to your inquiry.
          </p>
        </form>
      )}
    </div>
  );
};
