# Agent GTM Plan
### LLM Execution Guide — App Validation & Go-to-Market

> **How to use this document:** Paste it into an LLM along with the App Definition block below, filled in for your specific app. The LLM will execute each phase in order and produce all required outputs before moving to the next phase.

---

## App Definition (Input)

Fill in this block before running any phase. The LLM will use it as the source of truth throughout.

```
App name: [name]
One-line description: [what it does, for whom, and the core outcome it delivers]
Primary audience: [job title or persona, e.g. "freelance designers" or "small business owners"]
Problem it solves: [the specific pain the user has today]
How it solves it: [the mechanism — what the app actually does]
Key differentiator: [what no competitor does as well]
Pricing model: [free / freemium / one-time / subscription — include price point if known]
Current stage: [idea / prototype / working app]
```

---

## Phase 1 — Positioning & Competitive Landscape

**Objective:** Produce a tight positioning statement, ICP profile, and ranked differentiator list before building anything.

### 1.1 — Write the problem statement
Search the web for evidence of the problem this app addresses. Output a single sentence from the customer's point of view — no mention of the app.

### 1.2 — Map the competitive landscape
Search for every existing solution. For each competitor produce:
- Name, URL, price
- What the user can do or get
- The gap they leave open

Produce a comparison table. Identify the combination of attributes no competitor owns.

### 1.3 — Define the ICP
Using the App Definition and competitive research, output a structured profile:
- Job title(s) with budget authority
- Behavioral signal that indicates they have the problem *right now*
- What they currently use to solve it

### 1.4 — Write the positioning statement
Using this template, produce 2–3 variants and flag the strongest:
> For [ICP], [App Name] is the [category] that [key benefit] — unlike [primary alternative] — because [reason to believe].

### 1.5 — Rank the differentiators
List 3–5 differentiators ranked by importance to the ICP (not technical novelty). For each: state what it is, why the ICP cares, and which competitor it beats on this dimension.

---

## Phase 2 — Prepare All Site Content

**Objective:** Write every word that will appear on the microsite before touching Lovable. The Lovable prompt in Phase 3 is sent once, fully populated — no scaffold-then-patch workflow.

> **Why prepare first:** Lovable produces its best output when given complete, specific content rather than placeholders. Generating all copy and trust content here means the single prompt in Phase 3 builds the finished site, not a shell to iterate on.

### 2.1 — Write the page copy

Using the positioning statement from Phase 1.4 and the ranked differentiators from Phase 1.5, draft the following. Output each as a labeled block — they slot directly into the Phase 3 prompt.

**Hero headline:** 10 words or fewer. Names the ICP explicitly in the first 5 words. Contains the primary benefit, not the app name. Example: "Built for freelance designers who charge by the project."

**Hero sub-headline:** 1–2 sentences. States the mechanism and the outcome. No feature names.

**Problem statement:** 2–3 sentences describing the pain the ICP feels today. No solution mentioned yet. Write in second person ("You spend hours...").

**How it works — 3 steps:** Each step is a short label (3–4 words) and one sentence. The mechanism must be immediately obvious to someone unfamiliar with the app.

**Benefits — 3–5 bullets:** Outcome language only ("You will..." not "The app has..."). Each bullet is one sentence.

**CTA copy:** One primary action label (e.g., "Get Early Access", "Try Free", "Join the Waitlist"). Be specific — "Learn More" is not acceptable.

### 2.2 — Write the trust content

This app has no existing users, reviews, or testimonials. Every trust element must be credible at zero-user stage. Produce each of the following as a labeled block:

**Founder transparency block:** First name, relevant professional background (2–3 sentences), and why they built this. If a LinkedIn URL exists, include it. One real human behind the product outperforms any brand statement.

**"Why I built this" narrative (3–4 sentences):** Include the specific moment or frustration that prompted the idea, the founder's relevant background, what the app does that existing tools do not, and an honest statement about where the app is today. Do not edit into corporate language — authenticity is the signal.

**Data handling statement (3 bullets, plain language):**
1. What you collect and why
2. Where it is stored and who can access it
3. What you will never do with it — no jargon, no legalese

**Early access framing (1–2 sentences):** Reframe being first as an advantage — direct founder access, ability to shape the product, or a locked-in lower price. Do not fabricate a waitlist number.

**Risk-reversal statement (1 sentence):** Removes the downside of signing up. Match to pricing model: free tier → "Free to start, no card required." Paid → "30-day money-back, no questions." Waitlist → "Just your email — unsubscribe anytime." This line goes directly above the CTA button.

### 2.3 — Write the Privacy Policy and Terms of Service

Generate minimal, plain-language versions of both documents. 300–500 words each is sufficient.

**Privacy Policy must cover:**
- What personal data is collected (email address, usage data)
- How it is stored and for how long
- Whether it is shared with third parties (email provider, analytics)
- How users can request deletion

**Terms of Service must cover:**
- What the service is and is not
- What the user may and may not do
- Limitation of liability
- How to contact the operator

Output each as a full document, ready to paste. They will be linked from the site footer.

### 2.4 — Copy readiness checklist

Before moving to Phase 3, confirm every block is complete and labeled:
- [ ] Hero headline (≤ 10 words, ICP named, primary benefit present)
- [ ] Hero sub-headline (mechanism + outcome, no feature names)
- [ ] Problem statement (second person, no solution mentioned)
- [ ] How it works (3 steps, mechanism clear)
- [ ] Benefits (3–5 bullets, outcome language)
- [ ] CTA copy (specific action label)
- [ ] Founder transparency block
- [ ] "Why I built this" narrative
- [ ] Data handling statement (3 bullets)
- [ ] Early access framing
- [ ] Risk-reversal statement
- [ ] Pricing details (tier name, price, what's included)
- [ ] Privacy Policy (full text)
- [ ] Terms of Service (full text)

---

## Phase 3 — Build the Microsite in Lovable

**Objective:** Send a single, fully-populated prompt to [Lovable](https://lovable.dev) that builds the complete site — design and content together in one shot.

> **How Lovable works:** Lovable is an AI-powered web builder driven by natural language prompts. It produces its best output when given complete content, not placeholders. The prompt below is a template — substitute every bracketed value with the actual copy prepared in Phase 2 before sending. Do not send it with placeholders still in place.

### 3.1 — The single-shot Lovable prompt

Copy this prompt, fill in every bracketed value from Phase 2, then send it as your first and primary Lovable message:

```
Build a single-page marketing microsite for [App Name].

DESIGN
- Style: clean and minimal. No stock photography. Use abstract shapes or simple geometric illustrations only.
- Primary color: [hex or color name]
- Tone: [professional / friendly / direct — pick one that fits the ICP]
- Mobile-first layout. Every section must be readable and usable at 375px.

SECTIONS — build in this order:

1. HERO
   Headline: [paste hero headline from 2.1]
   Sub-headline: [paste sub-headline from 2.1]
   CTA button: [paste CTA copy from 2.1] — clicking this scrolls to the email capture section
   Risk-reversal line directly below the button: [paste risk-reversal statement from 2.2]

2. PROBLEM
   [Paste problem statement from 2.1]

3. HOW IT WORKS
   Step 1: [label] — [one sentence]
   Step 2: [label] — [one sentence]
   Step 3: [label] — [one sentence]

4. BENEFITS
   - [benefit 1]
   - [benefit 2]
   - [benefit 3]
   (add more if provided)

5. TRUST
   Subsection — Who built this:
   [Paste founder transparency block from 2.2]

   Subsection — Why I built this:
   [Paste "why I built this" narrative from 2.2]

   Subsection — Your data:
   [Paste data handling statement (3 bullets) from 2.2]

   Subsection — You're early:
   [Paste early access framing from 2.2]

6. PRICING
   Tier: [tier name]
   Price: [price]
   What's included: [bullet list]
   CTA: [CTA copy]

7. EMAIL CAPTURE
   Heading: [e.g., "Get early access" or "Be the first to know"]
   Single email input field
   Submit button: [CTA copy]
   Confirmation message shown inline after submit: "You're in. We'll be in touch."
   Include a second, smaller email capture in the page footer using the same form.

8. FOOTER
   App name: [App Name]
   Tagline: [one-line tagline]
   Links: Privacy Policy | Terms of Service
   (Privacy Policy and Terms of Service open as separate pages or modals with the full text provided below)

PRIVACY POLICY PAGE TEXT:
[Paste full Privacy Policy from 2.3]

TERMS OF SERVICE PAGE TEXT:
[Paste full Terms of Service from 2.3]
```

### 3.2 — Connect email capture
In Lovable, connect the email capture form to a free [Mailchimp](https://mailchimp.com) or [Kit (formerly ConvertKit)](https://kit.com) audience. Confirm:
- Submissions are recorded in the audience
- A simple auto-reply confirmation email is sent to the subscriber
- The hero form and footer form are distinguishable by a `source` label (`hero` vs `footer`) so you know which placement converts better

### 3.3 — Add analytics
In Lovable's settings, connect Google Analytics 4 (GA4). Paste the Measurement ID (`G-XXXXXXXXXX`) from your GA4 property. Then in the GA4 dashboard:
- Confirm GA4 Realtime shows page views within 60 seconds of visiting the live site
- Create a conversion event named `generate_lead` triggered on email form submission

### 3.4 — Publish and verify
Publish the site on Lovable's subdomain or connect a custom domain. Verify:
- [ ] All sections render correctly at 375px (mobile) and 1280px (desktop)
- [ ] The hero CTA button scrolls to the email form
- [ ] The email form submits without errors and the inline confirmation appears
- [ ] Privacy Policy and Terms of Service are reachable from the footer
- [ ] No broken links exist on the page
- [ ] GA4 Realtime shows an active session within 60 seconds of visiting

---

## Phase 4 — Google Ads A/B Test

**Objective:** Run a Google Search Ads campaign structured to test 2–3 variants of the business proposition — not just drive traffic. Each ad group represents a different value framing. The winning framing informs the GTM recommendation in Phase 5.

### 4.1 — Define the proposition variants to test
Using the positioning statement variants from Phase 1.4 and the ranked differentiators from Phase 1.5, define 2–3 distinct value framings to pit against each other. Each variant should answer the question "why should I click?" from a different angle:

| Variant | Framing angle | Example |
|---|---|---|
| A | Primary differentiator | Fastest / most accurate / cheapest way to [outcome] |
| B | Problem-first | [Pain point] is costing you [X] — here's how to fix it |
| C (optional) | Social proof / authority | [Outcome] trusted by [credible peer group] |

Each variant becomes one ad group in the campaign.

### 4.2 — Select keywords for each variant
Using the ICP profile from Phase 1.3 and the competitive landscape from Phase 1.2, identify 10–15 keywords per ad group. Selection criteria:
- **Commercial or transactional intent only** — exclude purely informational queries
- **Directly relevant to the ad group's framing** — a problem-first ad group should use problem-aware search terms
- For each keyword include: estimated monthly volume, competition level, and CPC estimate (use Google Keyword Planner or a DataForSEO research call if available)

### 4.3 — Write ad copy for each variant
For each ad group, produce Responsive Search Ad (RSA) copy. All copy must reflect the specific framing angle of that variant — do not reuse headlines across variants.

**Headlines — 10 per ad group, each ≤ 30 characters:**
- At least 2 headlines contain the primary keyword or a close variant
- At least 1 headline is action-oriented ("Try Free Today", "Get Started Now")
- Express benefits in outcome language, not feature names
- Include the character count after each headline

**Descriptions — 4 per ad group, each ≤ 90 characters:**
- Each description stands alone as a complete value statement
- The top differentiator from Phase 1.5 appears in at least one description
- At least 2 descriptions contain a CTA
- Include the character count after each description

### 4.4 — Set up conversion tracking before launch
Before the campaign goes live, confirm the following are instrumented:
- GA4 is connected to Google Ads (link in GA4 → Admin → Google Ads Links)
- The email form submission event (`generate_lead`) is imported into Google Ads as a conversion action
- UTM parameters are appended to all ad destination URLs:
  `?utm_source=google&utm_medium=cpc&utm_campaign=[campaign-name]&utm_content=[variant-a|b|c]`

This ensures each ad group's traffic is attributable in both GA4 and Google Ads.

### 4.5 — Campaign settings
| Setting | Recommended value |
|---|---|
| Campaign type | Search |
| Bidding strategy | Maximize Conversions (switch to Target CPA once 30+ conversions recorded) |
| Daily budget | $20–50/day minimum to accumulate data within 2–3 weeks |
| Location | United States (or the ICP's primary geography) |
| Ad schedule | 24/7 initially; optimize after 2 weeks of data |
| Search partners | Disabled initially |
| Display expansion | Disabled |

Run all ad groups simultaneously within the same campaign so budget is shared and variant performance is directly comparable.

### 4.6 — Quality checklist before going live
- [ ] All headlines ≤ 30 characters (recount after every revision)
- [ ] All descriptions ≤ 90 characters
- [ ] Each ad group has ≥ 10 keywords, 10 headlines, 4 descriptions
- [ ] Conversion tracking fires on email form submission — test with Google Tag Assistant
- [ ] UTM parameters are present on all destination URLs
- [ ] The destination URL loads correctly and the email form is visible above the fold on mobile
- [ ] No ad group uses the same headline verbatim as another (variants must be distinct)

---

## Phase 5 — Results Analysis & GTM Recommendation

**Objective:** After 2–4 weeks of live data, analyze the campaign and site performance to determine the strongest business proposition and recommend the best path to market.

Run this phase once the campaign has accumulated at least 100 clicks per ad group, or after 3 weeks — whichever comes first.

### 5.1 — Pull the data
Collect the following from each source:

**From Google Ads (per ad group / variant):**
- Impressions, clicks, CTR
- Conversions (email signups), conversion rate
- Cost per conversion
- Top-performing headlines by click share (available under Assets → Headlines)
- Top-performing descriptions by click share

**From GA4:**
- Sessions by UTM content (variant A/B/C)
- `generate_lead` conversions by variant
- Bounce rate and average engagement time per variant
- Device breakdown (mobile vs. desktop) per variant

**From the email platform (Mailchimp / Kit):**
- Total subscribers by source label (hero vs. footer CTA)
- Open rate on the confirmation email (signals quality of intent)

### 5.2 — Score each variant
Produce a scoring table across the metrics that matter most for a pre-launch validation:

| Metric | Weight | Variant A | Variant B | Variant C |
|---|---|---|---|---|
| Email conversion rate | 40% | | | |
| CTR (ad click-through) | 25% | | | |
| Cost per lead | 20% | | | |
| Engagement time on site | 15% | | | |
| **Weighted score** | 100% | | | |

Flag the winning variant. If no single variant dominates across all metrics, describe the mixed signal and propose a synthesis.

### 5.3 — Identify the winning headline and message
From the top-performing headlines in the winning ad group, identify the 2–3 headlines with the highest click share. These are the messages the ICP responded to most. Restate them in plain language — these become the core messaging inputs for the GTM plan.

### 5.4 — Identify audience and device signals
- Which device (mobile / desktop) drove the most conversions?
- Were there time-of-day or day-of-week patterns in conversion rate?
- Did any keyword within the winning ad group dramatically outperform the others?

These signals inform channel prioritization and audience targeting in the GTM plan.

### 5.5 — Produce the GTM recommendation
Based on the analysis, output a structured recommendation covering the following:

**1. Validated proposition**
State the winning value framing in one sentence. This becomes the headline of the homepage, the first line of outreach emails, and the positioning used in all paid channels going forward.

**2. Recommended primary channel**
Choose one from: Google Search Ads / SEO / Product-led growth / Outbound sales / Partnerships / App store. Justify the choice based on where the ICP was found, the cost per lead, and the conversion rate observed.

**3. Recommended next 30-day actions**
Produce a prioritized list of 5–7 specific actions to take the app from validated proposition to first paying customer. Each action must be specific (not "improve the site") and assigned a type label:
- **Build** — product or site changes
- **Content** — SEO articles, lead magnets, email sequences
- **Paid** — ad campaign changes or new channels
- **Outreach** — direct sales, partnerships, community

**4. Key risk to the plan**
State the single most likely reason this plan fails. Propose one mitigation.

**5. Success metric for the next 30 days**
Define one number that, if hit, confirms the GTM direction is correct. Examples: 50 email signups at < $8 CPL; 3 paying customers; 500 organic visits with 15% email conversion.

---

## Quick Reference — Output Checklist

| Phase | Outputs |
|---|---|
| 1 — Positioning | Problem statement, competitive table, ICP profile, 2–3 positioning variants (1 flagged), ranked differentiators |
| 2 — Site Content | Hero headline + sub-headline, problem statement, how it works (3 steps), benefits (3–5), CTA copy, founder block, "why I built this" narrative, data handling statement, early access framing, risk-reversal statement, Privacy Policy, Terms of Service |
| 3 — Build in Lovable | Single-shot prompt (fully populated), live Lovable URL, email capture connected, GA4 tracking confirmed |
| 4 — Google Ads | 2–3 ad groups with keywords + RSA copy, conversion tracking live, UTM parameters on all destination URLs |
| 5 — Analysis | Scoring table, winning variant, validated proposition statement, GTM recommendation with 30-day action plan |
