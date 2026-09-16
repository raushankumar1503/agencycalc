import type { Metadata } from "next";
import GuideLayout, {
  buildGuideMetadata,
  type RelatedTool,
} from "@/components/GuideLayout";

const meta = buildGuideMetadata({
  title: "Late-Payment Email Templates for Freelance Web Developers",
  slug: "late-payment-email-template",
  description:
    "Professional, ready-to-adjust email templates for when an invoice goes past its due date, plus practical habits that make late payment less likely.",
  updated: "September 16, 2026",
});

const relatedTools: RelatedTool[] = [
  {
    href: "/",
    label: "Website Project Quote Calculator",
    blurb:
      "Build clear, defensible project quotes so clients understand what they are paying for.",
  },
  {
    href: "/scope-creep",
    label: "Scope-Creep Cost Calculator",
    blurb:
      "Quote extra work cleanly so additional invoices are not a surprise.",
  },
  {
    href: "/guides/fixed-price-vs-hourly-web-development",
    label: "Fixed-Price vs. Hourly Pricing for Web Development",
    blurb: "Choose the model that makes your payment terms simplest.",
  },
];

export const metadata: Metadata = meta;

export default function Page() {
  return (
    <GuideLayout meta={meta} relatedTools={relatedTools}>
      <p>
        Chasing unpaid invoices is one of the most frustrating parts of
        freelance work. The templates below are written to be professional,
        firm, and easy to adjust. They work best when you have already set
        clear payment terms on the invoice — due date, accepted methods, and
        any late-fee policy — and when the client has received the deliverables
        as agreed.
      </p>

      <h2>Template 1: Friendly reminder (3–5 days past due)</h2>
      <p>
        Use this when the invoice has just slipped past its due date. Most
        delays are simple oversight, and a polite nudge resolves them fast.
      </p>
      <blockquote>
        Subject: Invoice <strong>[#1234]</strong> — friendly reminder<br /><br />
        Hi <strong>[Client Name]</strong>,<br /><br />
        I hope you are well. I am writing to check in on invoice
        <strong>[#1234]</strong> for <strong>[Project Name]</strong>, which was
        due on <strong>[due date]</strong>. It may have been missed in a busy
        inbox, so I wanted to bring it to your attention.<br /><br />
        You can view and pay the invoice here: <strong>[payment link]</strong>.<br /><br />
        If you have already sent payment, thank you — please disregard this
        note. Otherwise, let me know if anything needs clarification.<br /><br />
        Best regards,<br />
        <strong>[Your Name]</strong>
      </blockquote>

      <h2>Template 2: Firm follow-up (10–14 days past due)</h2>
      <p>
        If the first reminder gets no response, escalate slightly. Keep it
        professional and reference the original terms.
      </p>
      <blockquote>
        Subject: Follow-up — Invoice <strong>[#1234]</strong> past due<br /><br />
        Hi <strong>[Client Name]</strong>,<br /><br />
        I am following up on invoice <strong>[#1234]</strong>, which was due on
        <strong>[due date]</strong> and is now <strong>[X]</strong> days past
        due. Per our agreement, payment terms are <strong>[terms, e.g., Net
        15]</strong>.<br /><br />
        Please arrange payment by <strong>[specific date, e.g., end of this
        week]</strong> to avoid any interruption to ongoing work or late fees
        per our terms.<br /><br />
        If there is an issue with the invoice or the deliverables, please let
        me know so we can resolve it.<br /><br />
        Best regards,<br />
        <strong>[Your Name]</strong>
      </blockquote>

      <h2>Template 3: Final notice before escalation (30+ days past due)</h2>
      <p>
        At this stage you are documenting the situation and setting a clear
        deadline. Be direct but not aggressive.
      </p>
      <blockquote>
        Subject: Final notice — Invoice <strong>[#1234]</strong> overdue<br /><br />
        Hi <strong>[Client Name]</strong>,<br /><br />
        Invoice <strong>[#1234]</strong> for <strong>[Project Name]</strong> was
        due on <strong>[due date]</strong> and is now <strong>[X]</strong> days
        overdue. I have not received payment despite previous reminders on
        <strong>[dates]</strong>.<br /><br />
        Please remit the full amount of <strong>[amount]</strong> by
        <strong>[deadline, e.g., 5 business days]</strong>. If payment is not
        received by that date, I will need to [pause work / apply the late fee
        per our terms / engage a collections process].<br /><br />
        I would prefer to resolve this directly. If there is a dispute about
        the invoice or the work, please reply so we can address it.<br /><br />
        Regards,<br />
        <strong>[Your Name]</strong>
      </blockquote>

      <h2>Template 4: When you must pause work</h2>
      <p>
        If your contract allows pausing work for non-payment, this email
        documents the pause. Send it after the final notice deadline passes.
      </p>
      <blockquote>
        Subject: Work paused — Invoice <strong>[#1234]</strong> unpaid<br /><br />
        Hi <strong>[Client Name]</strong>,<br /><br />
        As noted in my previous email, invoice <strong>[#1234]</strong> remains
        unpaid after <strong>[X]</strong> days. Per our agreement, I am pausing
        all work on <strong>[Project Name]</strong> effective today until the
        outstanding balance of <strong>[amount]</strong> is received.<br /><br />
        Once payment is confirmed, I will resume and confirm a revised
        timeline.<br /><br />
        Regards,<br />
        <strong>[Your Name]</strong>
      </blockquote>

      <h2>Making late payment less likely</h2>
      <p>
        Fewer late payments start with clearer terms up front: a deposit before
        work begins, defined milestones, and a fixed due date stated on the
        invoice. Clear pricing makes this easier. When your project price is a
        well-explained fixed figure — which the Website Project Quote Calculator
        supports — the client understands what they are paying for and when,
        which reduces friction at payment time. Invoices with clear line items
        and a stated due date get paid faster than vague total-amount invoices
        with no context.
      </p>

      <p>
        This guide is general information. Your contracts and late-payment
        policies should be reviewed for your own jurisdiction and situation.
        Treat these templates as a starting point and adjust them to match your
        terms and local laws.
      </p>
    </GuideLayout>
  );
}