import type { Metadata } from "next";
import GuideLayout, {
  buildGuideMetadata,
  type RelatedTool,
} from "@/components/GuideLayout";

const meta = buildGuideMetadata({
  title: "How to Charge for Extra Website Changes",
  slug: "how-to-charge-for-extra-website-changes",
  description:
    "A fair, transparent way to quote additional work that falls outside the original project scope for freelance web developers.",
  updated: "September 16, 2026",
});

const relatedTools: RelatedTool[] = [
  {
    href: "/scope-creep",
    label: "Scope-Creep Cost Calculator",
    blurb:
      "Enter original price, original hours, additional hours, revisions, and rush surcharge to get a recommended additional fee.",
  },
  {
    href: "/",
    label: "Website Project Quote Calculator",
    blurb: "See the original quote math when defining the base scope.",
  },
  {
    href: "/guides/website-revision-policy",
    label: "How to Set a Website Revision Policy",
    blurb: "Define what counts as a revision versus new work before the project starts.",
  },
];

export const metadata: Metadata = meta;

export default function Page() {
  return (
    <GuideLayout meta={meta} relatedTools={relatedTools}>
      <p>
        Extra requests are a normal part of web projects. A client asks for a
        new section, a different integration, or a design tweak that was not in
        the original scope. The problem is not the request — it is the missing
        process to turn that request into a fair, agreed fee before the work
        begins. Below is a practical approach.
      </p>

      <h2>Define what the original scope covers</h2>
      <p>
        Before you can charge for extra work, the original scope has to be
        written down. List the pages, templates, integrations, and features
        included. State how many revision rounds are covered and what counts as
        a revision. When the boundary is explicit, any request outside it is
        clearly new work, and the conversation about price starts from a shared
        understanding rather than a vague feeling that &quot;this feels like more.&quot;
      </p>

      <h2>Use the original project&apos;s implied rate</h2>
      <p>
        If the original project was priced at $8,000 for 80 estimated hours,
        the implied hourly value is $100 per hour. This number is not a
        contract rate — it is a reference point. When the client asks for 20
        more hours of work, you start from that same implied rate: 20 hours at
        $100 gives a baseline of $2,000. This keeps the pricing consistent with
        the original quote and avoids the appearance of arbitrary pricing.
      </p>

      <h2>Add revision costs if the new work needs its own revisions</h2>
      <p>
        Extra work often brings extra revision requests. If the original
        agreement included two revision rounds, the new scope might need its
        own. Set a per-revision-round price (often a flat amount) and add it
        for the expected rounds on the additional work. This prevents the
        &quot;just one more tweak&quot; cycle from absorbing the new fee.
      </p>

      <h2>Consider a rush surcharge for expedited delivery</h2>
      <p>
        When a client needs the extra work on a tight timeline, a rush
        surcharge compensates for the schedule disruption. A typical range is
        ten to fifty percent of the subtotal, applied as a percentage. The
        Scope-Creep Cost Calculator lets you set this and see the total
        immediately, so the client sees the trade-off: faster delivery, higher
        fee.
      </p>

      <h2>Present the total as a single additional fee</h2>
      <p>
        Roll labor, revisions, and rush into one recommended additional fee.
        This is the number you put in the change order. The client sees one
        price, and the breakdown lives in the calculator for you. The Scope-Creep
        Cost Calculator also generates a professional client message you can
        copy and paste, which frames the fee clearly and keeps the tone
        collaborative.
      </p>

      <h2>Worked example</h2>
      <p>
        Original project: <strong>$8,000</strong> over <strong>80 hours</strong>
        (implied rate $100/hour). The client requests <strong>20 additional
        hours</strong>, <strong>2 revision rounds</strong> at
        <strong>$50 each</strong>, with a <strong>25%</strong> rush surcharge.
        Additional labor: <strong>20 × $100 = $2,000</strong>. Revision cost:
        <strong>2 × $50 = $100</strong>. Subtotal: <strong>$2,100</strong>.
        Rush surcharge: <strong>25% × $2,100 = $525</strong>. Recommended
        additional fee: <strong>$2,625</strong>. Updated project total:
        <strong>$10,625</strong>.
      </p>

      <h2>Confirm in writing before starting</h2>
      <p>
        A verbal &quot;sure, sounds good&quot; is not a scope change. Send a short email
        or a revised line-item that the client can approve, and do not begin
        the extra work until you have that confirmation. This protects both
        sides: the client knows exactly what they are paying for, and you know
        the work is funded before you spend the hours. A simple sentence in the
        email like &quot;I will not begin work until this is approved&quot; makes the
        boundary clear without being confrontational.
      </p>

      <h2>Consider a standing out-of-scope rate</h2>
      <p>
        Some freelancers publish a default extra-scope hourly rate in their
        original contract — a reference number that applies whenever work falls
        outside the original agreement. This is especially useful for ongoing
        relationships where new requests are expected. It means you do not
        renegotiate from scratch each time; you already have a shared
        reference point for quoting the extra work quickly.
      </p>

      <p>
        This guide is general information to help with planning. Your actual
        approach should match your contract terms and local laws. Treat the
        figures as a starting point and verify them against your own situation
        before committing to a price.
      </p>
    </GuideLayout>
  );
}