import type { Metadata } from "next";
import GuideLayout, {
  buildGuideMetadata,
  type RelatedTool,
} from "@/components/GuideLayout";

const meta = buildGuideMetadata({
  title: "How to Price Monthly Website Maintenance",
  slug: "website-maintenance-pricing",
  description:
    "How to build a monthly support price that covers labor, hosting, software, and a margin for ongoing website maintenance.",
  updated: "September 16, 2026",
});

const relatedTools: RelatedTool[] = [
  {
    href: "/maintenance",
    label: "Website Maintenance Pricing Calculator",
    blurb:
      "Enter sites, hours per site, rate, software and hosting costs, and profit buffer to see a monthly package price.",
  },
  {
    href: "/",
    label: "Website Project Quote Calculator",
    blurb: "Price the initial build before transitioning to maintenance.",
  },
  {
    href: "/scope-creep",
    label: "Scope-Creep Cost Calculator",
    blurb: "Handle ad-hoc requests that fall outside the maintenance package.",
  },
];

export const metadata: Metadata = meta;

export default function Page() {
  return (
    <GuideLayout meta={meta} relatedTools={relatedTools}>
      <p>
        Monthly website maintenance is a recurring revenue stream for
        freelancers and agencies, but it only works if the price covers what
        you actually spend. A good maintenance price accounts for labor, hosting,
        software licenses, and a margin — not just a guess at what the market
        will bear. Below is a method to build a number you can explain and
        defend.
      </p>

      <h2>Count the real labor first</h2>
      <p>
        Most maintenance packages bundle a fixed amount of support time each
        month — for example, four hours per site. This is not an arbitrary
        limit; it is an estimate of what the site actually needs. Track how
        long routine updates, plugin checks, backups, security scans, and
        content tweaks take across a few months, then set the included hours to
        that average. If a client needs more, you already have a mechanism to
        bill for it (see the extra-scope guide for how to handle that
        conversation).
      </p>

      <h2>Set a rate that reflects maintenance work</h2>
      <p>
        Maintenance is often less visible than project work, but it still
        requires skill and time. Your maintenance hourly rate can be the same as
        your project rate, or slightly lower if the work is more routine — but
        it should not be so low that it devalues your time. A common approach is
        to use your standard blended rate and apply it to the included hours.
      </p>

      <h2>Add the fixed costs you cannot avoid</h2>
      <p>
        Hosting is the obvious one: if you host the site on behalf of the
        client, that monthly cost is part of the package. Software licenses
        (backup plugins, security scanners, staging environments, page builder
        licenses) are real costs too. Add the total monthly spend on tools and
        licenses divided by the number of sites you cover, or track it per site
        if the licenses are site-specific. Do not absorb these into your margin
        without tracking them, or you will not know when they rise.
      </p>

      <h2>Add a profit buffer</h2>
      <p>
        Once you have labor plus fixed costs, add a buffer — typically fifteen
        to twenty-five percent — so the package is profitable after all real
        costs are covered. This buffer absorbs the variance that comes with
        managing multiple sites: a plugin conflict that takes an extra hour, a
        hosting migration, or an urgent security patch. It also keeps the
        package from becoming a loss leader when a site turns out to need more
        attention than expected.
      </p>

      <h2>Worked example</h2>
      <p>
        You maintain <strong>5 client sites</strong>. Each site averages{" "}
        <strong>4 support hours per month</strong> at a <strong>$75/hour</strong>
        rate. Total monthly labor is{" "}
        <strong>5 × 4 × $75 = $1,500</strong>. Hosting is{" "}
        <strong>$15 per site</strong>, so{" "}
        <strong>5 × $15 = $75</strong>. Software and plugin licenses across all
        sites total <strong>$100/month</strong>. Base operating cost is{" "}
        <strong>$1,675</strong>. A <strong>20%</strong> profit buffer adds{" "}
        <strong>$335</strong>. The monthly package price is{" "}
        <strong>$2,010</strong>, or{" "}
        <strong>$402 per site</strong>. This is exactly what the Website
        Maintenance Pricing Calculator returns for those inputs.
      </p>

      <h2>Make the package easy to explain</h2>
      <p>
        Clients buy clarity, not complexity. A maintenance price that is easy to
        explain — &quot;I handle all updates, backups, and security, and you get
        four hours of support a month, all for one flat fee&quot; — gets approved
        faster than a long spreadsheet. The calculator does the math behind the
        scenes, but your pitch should be brief: what they get, how often, and
        what it costs. Anything unusual can go in the contract details.
      </p>

      <h2>Review the price over time</h2>
      <p>
        Set a review cadence — annually is common. Hosting, software, and your
        own rates change, and the workload on a site may grow as it does. A
        plan that is fair at the start is not necessarily fair two years in.
        Schedule a time to revisit the numbers rather than letting a stale
        price quietly under-pay the work. A small annual adjustment is far
        easier to negotiate than a large catch-up increase after years of
        under-pricing.
      </p>

      <p>
        This guide is general information to help with planning. Your actual
        pricing will depend on your own costs, client requirements, and local
        market. Treat the figures as a starting point and verify them against
        your own situation before committing to a price.
      </p>
    </GuideLayout>
  );
}