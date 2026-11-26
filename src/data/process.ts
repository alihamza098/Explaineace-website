import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    step: "Step 01",
    number: "01",
    title: "Share Your Product",
    description:
      "Provide staging or live product access along with any talking points, feature highlights, or existing documentation.",
    deliverable: "Product sandbox access & objective alignment",
    icon: "KeyRound",
  },
  {
    step: "Step 02",
    number: "02",
    title: "Plan the Story",
    description:
      "We outline the step-by-step user journey, draft a concise voiceover script, and map out visual focus points for approval.",
    deliverable: "Script, timeline storyboard & scene structure",
    icon: "FileText",
  },
  {
    step: "Step 03",
    number: "03",
    title: "Produce the Video",
    description:
      "High-definition screen capture, studio voice recording, dynamic zooms, cursor smoothing, callout badges, and motion polish.",
    deliverable: "Rough cut for review & feedback",
    icon: "Video",
  },
  {
    step: "Step 04",
    number: "04",
    title: "Deliver the Final Cut",
    description:
      "We refine based on your notes and deliver final high-resolution MP4s (1080p/4K) along with captions (.SRT) and embed codes.",
    deliverable: "Master exports, web-ready files & captions",
    icon: "CheckCircle2",
  },
];

export const processFaqs = [
  {
    question: "Do I need to have a script ready before reaching out?",
    answer:
      "No. While you are welcome to provide your own script or bullet points, I can draft a complete, production-ready script based on your software, product tour, or existing knowledge base.",
  },
  {
    question: "How do you handle sensitive data during screen recording?",
    answer:
      "We use staging/sandbox environments or dummy test accounts whenever possible. Any real names, private keys, or internal data can be selectively blurred or masked during post-production.",
  },
  {
    question: "What is the typical turnaround time for a walkthrough video?",
    answer:
      "Most standard software walkthroughs and tutorials (1 to 3 minutes) are completed within 3 to 5 business days, including script review and initial draft delivery. Rush delivery is also available.",
  },
  {
    question: "Can you provide both voiceover and captions?",
    answer:
      "Yes. Every video can include clear, professional voiceover narration as well as synchronized closed captions (.SRT files or burned-in subtitles) for social and silent viewing.",
  },
  {
    question: "Can I order directly through Fiverr or work with you directly?",
    answer:
      "Both options are completely welcome. If you prefer the buyer protection of Fiverr, you can hire me through my Fiverr profiles (explainerace or video_supermacy). Or, you can reach out directly via email to initiate a custom contract.",
  },
];
