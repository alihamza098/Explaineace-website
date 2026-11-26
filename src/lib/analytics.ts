import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

/** Thin wrapper so analytics can never break the UI (blocked scripts, SSR). */
export function trackEvent(name: string, props?: Props) {
  try {
    if (typeof window === "undefined") return;
    track(name, props);
  } catch {
    /* analytics must never affect the page */
  }
}

export const events = {
  filmPlay: "portfolio_play",
  packageSelect: "package_select",
  publishingSelect: "publishing_select",
  emailDraftOpened: "email_draft_opened",
  whatsappClick: "whatsapp_click",
  formatSelect: "format_demo_select",
  formatReplay: "format_demo_replay",
} as const;
