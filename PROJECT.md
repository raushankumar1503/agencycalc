# AgencyCalc

A practical calculator website for freelance web developers and small agencies.

**Mission:** Fast, honest, single-purpose calculators. No friction, no fluff — an
operational tool a working professional opens to get a number and moves on.

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **State/logic:** Client-side only. No database, auth, payments, or analytics.
- **Lint/type:** ESLint (`next/core-web-vitals`) + `tsc --noEmit`

## Scope guardrails

Currently built: the Website Project Quote Calculator at `/`, the Website
Maintenance Pricing Calculator at `/maintenance`, and the Scope-Creep Cost
Calculator at `/scope-creep`. Build one tool at a time.
Do **not** add databases, authentication, payments, analytics, blog pages, dark
mode, illustrations/animated effects, charts, or unrelated tools without an
explicit ask. Always stop after the current tool is complete.

## Visual design system

The product must read as a **professional accounting / operational tool**, not an
AI-startup landing page.

- **Palette:** Neutral, restrained. White / soft-neutral surfaces, dark neutral
  text, subtle 1px borders. One calm accent reserved for focus states and the
  small primary action. **No gradients.**
- **Typography:** System sans for UI; right-aligned, `tabular-nums` figures for
  monetary values and results.
- **Buttons:** Standard **utility controls** — small, rectangular, subtle
  border + hover background, modest padding. **No** large pill/rounded CTA.
- **Labels:** Always visible field labels; never rely on placeholder text as the
  label. Use real helper text where it clarifies.
- **Layout (desktop ≥ lg):** Calculator form on the **left**; results card on the
  **right**, sticky within the viewport.
- **Layout (mobile):** Form first, results **beneath** it. No two-column squeeze.
- **Motion:** None. No fade/slide/parallax/scroll animations.
- **Imagery:** None. No hero art, charts, illustrations, icons as decoration, or
  social proof.

## Accessibility

- Semantic HTML landmarks and fieldset/legend grouping for form controls.
- Keyboard-focusable controls with clearly **visible focus** (accent focus ring).
- Inline, human-readable validation errors associated with their field
  (`aria-describedby` + `aria-invalid`).
- All currency displayed in readable **USD** format.

## Page 1 — Website Project Quote Calculator

Responsive single-page calculator at `/`.

### Inputs

| Field                     | Type   | Required | Min | Default | Constraints          |
| ------------------------- | ------ | -------- | --- | ------- | -------------------- |
| Project name              | text   | no       | –   | –       | free text            |
| Estimated hours           | number | yes      | 1   | –       | ≥ 1                  |
| Hourly rate (USD)         | number | yes      | 1   | –       | ≥ 1                  |
| Fixed costs (USD)         | number | no       | –   | 0       | ≥ 0                  |
| Revision rounds included  | number | no       | –   | 2       | ≥ 0, integer         |
| Extra revision rate (USD) | number | no       | –   | 0       | ≥ 0                  |
| Profit buffer (%)         | number | no       | –   | 15      | 0–100                |

### Formulas

```
labor       = estimatedHours * hourlyRate
baseCost    = labor + fixedCosts
profitBuffer = baseCost * (profitBufferPercent / 100)
suggestedQuote = baseCost + profitBuffer
optionalRevisionCost = extraRevisionRate
```

### Outputs (shown live after valid input)

- Labor subtotal
- Fixed-cost subtotal
- Profit buffer amount
- Suggested project quote
- Optional revision cost

### Interactions & copy

### Interactions & copy

- "Reset calculator" button restores defaults and clears results.
- Concise plain-English explanation beneath the results.
- Estimate disclaimer (verbatim): “This calculator provides a planning estimate
  and is not tax, legal, or financial advice.”
- Short worked example beneath the calculator using realistic values.

## Page 2 — Website Maintenance Pricing Calculator

Responsive single-page calculator at `/maintenance`.

### Inputs

| Field                          | Type   | Required | Min | Default | Constraints          |
| ------------------------------ | ------ | -------- | --- | ------- | -------------------- |
| Number of client websites      | number | yes      | 1   | –       | ≥ 1, whole number    |
| Support hours per website/mo   | number | yes      | 0   | –       | ≥ 0                  |
| Hourly support rate (USD)      | number | yes      | 1   | –       | ≥ 1                  |
| Software/plugin/license (USD)  | number | no       | –   | 0       | ≥ 0                  |
| Hosting cost per website (USD) | number | no       | –   | 0       | ≥ 0                  |
| Desired profit buffer (%)      | number | yes      | –   | 20      | 0–100                |

### Formulas

```
totalSupportHours = sites * hoursPerSite
monthlyLaborCost  = totalSupportHours * hourlyRate
totalHostingCost  = sites * hostingPerSite
baseOperatingCost = monthlyLaborCost + totalHostingCost + softwareCosts
profitBuffer      = baseOperatingCost * (profitBufferPercent / 100)
packagePrice      = baseOperatingCost + profitBuffer
perClientPrice    = packagePrice / sites
```

### Outputs (shown live after valid input)

- Total monthly support hours
- Monthly labor cost
- Total hosting cost
- Software and license costs
- Base monthly operating cost
- Profit buffer amount
- Recommended monthly package price
- Recommended per-client monthly price

### Interactions & copy

- "Reset calculator" button restores defaults and clears results.
- Transparent formula explanation beneath the results.
- Estimate disclaimer (verbatim): “This calculator provides a planning estimate
  and is not tax, legal, or financial advice.”
- Short mathematically consistent worked example beneath the calculator.

## Page 3 — Scope-Creep Cost Calculator

Responsive single-page calculator at `/scope-creep`.

### Inputs

| Field                          | Type   | Required | Min | Default | Constraints          |
| ------------------------------ | ------ | -------- | --- | ------- | -------------------- |
| Original project price (USD)   | number | yes      | 1   | –       | ≥ 1                  |
| Original estimated hours       | number | yes      | 1   | –       | ≥ 1                  |
| Additional requested hours     | number | yes      | 0   | –       | ≥ 0                  |
| Additional revision rounds     | number | no       | –   | 0       | ≥ 0, whole number    |
| Cost per revision round (USD)  | number | no       | –   | 0       | ≥ 0                  |
| Rush-work surcharge (%)        | number | no       | –   | 0       | 0–100                |
| Change-request description     | text   | no       | –   | –       | free text            |

Negative values and original estimated hours below 1 are rejected with inline
validation errors.

### Formulas

```
originalHourlyValue   = originalProjectPrice / originalEstimatedHours
additionalLaborCost   = additionalRequestedHours × originalHourlyValue
revisionCost          = additionalRevisionRounds × revisionRoundCost
subtotal              = additionalLaborCost + revisionCost
rushSurcharge         = subtotal × (rushSurchargePercent / 100)
recommendedAdditionalFee = subtotal + rushSurcharge
updatedProjectPrice   = originalProjectPrice + recommendedAdditionalFee
```

### Outputs (shown live after valid input)

- Implied original hourly value
- Additional labor cost
- Extra revision cost
- Rush surcharge
- Recommended additional fee
- Updated total project price
- Copyable professional client message

### Interactions & copy

- "Reset calculator" button restores defaults and clears results.
- Copy button with accessible "Copied to clipboard" feedback (2-second state,
  `aria-live="polite"`).
- Client message template: "Thanks for outlining the requested changes. These
  items are outside the original project scope and require an estimated [X]
  additional hours. The additional work is estimated at [AMOUNT]. Once approved,
  I can add it to the project plan." If a change-request description was entered,
  it is included naturally ("Thanks for outlining the requested changes for:
  [description]. …"). User input is rendered only as plain text, never as HTML.
- Transparent formula explanation beneath the results.
- Estimate disclaimer (verbatim): “This calculator provides a planning estimate
  and is not tax, legal, or financial advice.”
- Short mathematically consistent worked example beneath the calculator.