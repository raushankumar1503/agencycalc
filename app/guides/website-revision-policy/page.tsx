import type { Metadata } from "next";
import GuideLayout, {
  buildGuideMetadata,
  type RelatedTool,
} from "@/components/GuideLayout";

const meta = buildGuideMetadata({
  title: "How to Set a Website Revision Policy",
  slug: "website-revision-policy",
  description:
    "Define how many revisions are included and how to charge for the rest, before work begins. A practical guide for freelance web developers.",
  updated: "September 16, 2026",
});

const relatedTools: RelatedTool[] = [
  {
    href: "/scope-creep",
    label: "Scope-Creep Cost Calculator",
    blurb:
      "When revisions exceed the included rounds, use this to calculate the additional fee.",
  },
  {
    href: "/",
    label: "Website Project Quote Calculator",
    blurb:
      "Include revision rounds and extra-revision rate in the original project quote.",
  },
  {
    href: "/guides/how-to-charge-for-extra-website-changes",
    label: "How to Charge for Extra Website Changes",
    blurb: "Handle work that goes beyond both scope and revision allowances.",
  },
];

export const metadata: Metadata = meta;

export default function Page() {
  return (
    <GuideLayout meta={meta} relatedTools={relatedTools}>
      <p>
        A revision policy answers one question up front: how many rounds of
        changes are included, and what happens when the client asks for more?
        Without it, every small tweak becomes a negotiation, and the project
        either runs over budget or damages the relationship. A clear policy
        puts the boundary in writing before the first design is shown.
      </p>

      <h2>What counts as a revision</h2>
      <p>
        A revision is a change to something that was already in scope —
        rewording copy, adjusting a color, moving a section, or swapping an
        image. It is not a new page, a new feature, a new integration, or a
        redesign of a template that was already approved. State this explicitly
        in the policy so the client can see the difference between refining
        what exists and requesting something new.
      </p>

      <h2>How many rounds to include</h2>
      <p>
        Two to three rounds is common for a fixed-price project. One round is
        often too few (clients need at least one pass to consolidate feedback),
        and unlimited rounds invite endless iteration. If you are unsure, start
        with two included rounds and price extra rounds at a flat fee. This
        keeps the project moving while giving the client a concrete cost if
        they want more.
      </p>

      <h2>Price the extra rounds</h2>
      <p>
        The extra-revision price can be a flat fee per round (e.g., $50–$150)
        or an hourly estimate if the rounds tend to be large. Either way,
        include the rate in the original quote so the client knows the cost
        before the extra round happens. The Website Project Quote Calculator
        has a field for extra revision rate so you can see how it affects the
        overall quote.
      </p>

      <h2>Put it in the scope document</h2>
      <p>
        The revision policy belongs in the same document that defines the
        project scope, timeline, and payment terms. When the client signs or
        approves the scope, they are also approving the revision terms. This
        avoids the &quot;I thought revisions were unlimited&quot; conversation later.
      </p>

      <h2>Handle borderline cases calmly</h2>
      <p>
        Some requests fall on the boundary between a revision and new work.
        A client might ask you to reword a paragraph and add a new
        screenshot. The cleanest response is to handle the wording as part
        of the included revision and quote the screenshot as new work.
        Clients usually find this fair, because you are treating the
        straightforward part as included and only charging when the request
        genuinely expands the scope.
      </p>

      <h2>Keep the tone collaborative</h2>
      <p>
        A revision policy is not a weapon; it is a shared expectation. Frame it
        as protecting the project&apos;s timeline and budget for both of you. In
        practice, most clients just want to know they are being treated fairly,
        and a clear policy signals exactly that. It also tends to make clients
        consolidate feedback, which usually produces a better project.
      </p>

      <p>
        This guide is general information to help with planning. Your actual
        contract terms should be reviewed for your own jurisdiction and
        situation. Treat the figures as a starting point and verify them against
        your own situation before committing to a price.
      </p>
    </GuideLayout>
  );
}