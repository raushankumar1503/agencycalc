import type { Metadata } from "next";
import GuideLayout, {
  buildGuideMetadata,
  type RelatedTool,
} from "@/components/GuideLayout";

const meta = buildGuideMetadata({
  title: "Fixed-Price vs. Hourly Pricing for Web Development",
  slug: "fixed-price-vs-hourly-web-development",
  description:
    "The trade-offs of fixed-price and hourly pricing models for web projects, and how to choose based on scope clarity, project size, and risk.",
  updated: "September 16, 2026",
});

const relatedTools: RelatedTool[] = [
  {
    href: "/",
    label: "Website Project Quote Calculator",
    blurb:
      "Build a fixed quote from hours, rate, fixed costs, and profit buffer.",
  },
  {
    href: "/scope-creep",
    label: "Scope-Creep Cost Calculator",
    blurb:
      "When hourly work exceeds estimates or fixed scope grows, calculate the additional fee.",
  },
  {
    href: "/guides/how-to-price-a-website-project",
    label: "How to Price a Website Project as a Freelancer",
    blurb: "The step-by-step method behind a defensible fixed price.",
  },
];

export const metadata: Metadata = meta;

export default function Page() {
  return (
    <GuideLayout meta={meta} relatedTools={relatedTools}>
      <p>
        Every freelance web project ends up on one of two pricing tracks: a
        fixed price agreed up front, or an hourly rate billed as you go. Both
        can work, and both can fail. The difference is usually whether the
        model matches the project&apos;s scope clarity and the client&apos;s tolerance
        for uncertainty.
      </p>

      <h2>Fixed price: clarity and a single number</h2>
      <p>
        A fixed price gives the client certainty — they know the total before
        work starts — and it gives you a clear target. It works best when the
        scope is well-defined: the pages, templates, features, and integrations
        are known, and the revision policy is explicit. The risk is yours: if
        the work takes longer than estimated, you absorb the extra time. That
        risk is why the fixed price must include a profit buffer and why the
        scope document is the contract&apos;s most important page.
      </p>

      <h2>Hourly: transparency and flexibility</h2>
      <p>
        Hourly billing shifts the time risk to the client. If the project
        grows, the client pays for the extra hours. This is useful when the
        scope is genuinely unclear at the start — for example, an exploratory
        phase, ongoing support without a fixed monthly cap, or a project where
        requirements will be discovered as you build. The downside is that the
        client may feel less control over the budget, and you have to track
        time rigorously and communicate frequently.
      </p>

      <h2>When to use which</h2>
      <p>
        Use fixed price when: the scope is clear and bounded, the client wants
        budget certainty, the project is a single delivery with a defined end,
        and you can estimate the work with reasonable confidence. Use hourly
        when: the scope is unknown or expected to change, the project is
        open-ended or ongoing, the client prefers to pay for time rather than
        a scope definition, or you are doing discovery work before a fixed
        phase begins.
      </p>

      <h2>Hybrid approaches</h2>
      <p>
        Many projects combine both: a fixed-price discovery phase that produces
        a scope document, followed by a fixed-price build. Or a fixed-price
        core deliverable with hourly billing for anything outside it. The
        Website Project Quote Calculator works for the fixed portion, and the
        Scope-Creep Cost Calculator handles the out-of-scope hourly work — both
        use the same implied rate so the math stays consistent.
      </p>

      <h2>Protect yourself with both models</h2>
      <p>
        Regardless of the pricing model, clear boundaries matter. With
        fixed pricing, a written scope protects against scope growth. With
        hourly pricing, a time-tracking process and a clear policy for when
        estimates drift protect both sides from surprises. In practice,
        the strongest protection is the same for both: define what is in
        scope, define what is not, and agree on both before work begins.
        The guide on{" "}
        <a href="/guides/website-revision-policy">revision policies</a>{" "}
        covers this in more detail for either approach.
      </p>

      <h2>How to build a confident fixed price</h2>
      <p>
        If you choose fixed pricing, build the number from the ground up rather
        than guessing: hours × rate, plus real fixed costs, plus a profit
        buffer. The{" "}
        <a href="/guides/how-to-price-a-website-project">
          guide to pricing a website project
        </a>{" "}
        walks through the method, and the Website Project Quote Calculator
        turns those inputs into a suggested quote. A transparent number backed
        by clear logic also makes it far easier to justify the price in a
        client conversation.
      </p>

      <p>
        This guide is general information to help with planning. Your actual
        pricing model should match your contract terms, local laws, and
        business structure. Treat the figures as a starting point and verify
        them against your own situation before committing to a price.
      </p>
    </GuideLayout>
  );
}