## Google Ads Campaign Build (LLM Instructions)

### Goal
Create a Google Ads campaign with 2–3 tightly themed ad groups. For each ad group, produce:
- **At least 10 popular keywords**
- **10 headlines** (each ≤ 30 characters)
- **4 descriptions** (each ≤ 90 characters)

Ensure outputs are formatted in simple tables. After drafting, **double‑check character counts** and fix anything over the limits.

### Research Phase (use DataForSEO via MCP)
Reference the approach in `pn-seo-keyword-research.md` (Phase 1 and Phase 2). Use the DataForSEO MCP tools in parallel where possible:
- **Discovery:**
  - `mcp_dataforseo_dataforseo_labs_google_related_keywords`
  - `mcp_dataforseo_dataforseo_labs_google_keyword_suggestions`
  - `mcp_dataforseo_dataforseo_labs_google_keyword_ideas`
  - Parameters: `location_name: "United States"`, `language_code: "en"`, `limit: 20-25`
- **Overview metrics:**
  - `mcp_dataforseo_dataforseo_labs_google_keyword_overview` for all discovered terms (batch up to ~30 at a time)
  - Use volume, competition, CPC, and intent to select “popular” keywords
- **Optional competitive context:**
  - `mcp_dataforseo_dataforseo_labs_google_ranked_keywords`, `mcp_dataforseo_dataforseo_labs_google_competitors_domain`

Then, semantically cluster the discovered keywords and choose **2–3 primary themes** as ad groups.

### Selection Rules
- **Ad group theming:** each group should be tightly focused around one intent/topic.
- **Keywords (≥10 per group):** prioritize measurable volume, relevant intent, and avoid near-duplicates.
- **Creatives:**
  - Headlines ≤ 30 characters; Descriptions ≤ 90 characters.
  - Use core benefits, outcomes, and action verbs; avoid repetition.
  - Align copy to the ad group’s keyword intent.

### Output Format
Provide outputs as simple markdown tables, one set per ad group. Include a character count column for headlines and descriptions and ensure all are within limits.

#### Campaign Summary Table
| Ad Group | Theme/Intent | Primary Keywords Seed |
|---|---|---|
| Ad Group 1 | [Theme 1] | [Top seed keyword(s)] |
| Ad Group 2 | [Theme 2] | [Top seed keyword(s)] |
| Ad Group 3 (optional) | [Theme 3] | [Top seed keyword(s)] |

#### Ad Group 1 – Combined Table
Include: ≥10 Keywords (with [brief note: volume/intent] after each), 10 Headlines (≤ 30 chars), 4 Descriptions (≤ 90 chars).

| Keywords | Headlines (≤ 30 chars) | Descriptions (≤ 90 chars) |
|---|---|---|
| - [keyword 1] [brief note: volume/intent]<br>- [keyword 2] [brief note: volume/intent]<br>- [keyword 3] [brief note: volume/intent]<br>- [keyword 4] [brief note: volume/intent]<br>- [keyword 5] [brief note: volume/intent]<br>- [keyword 6] [brief note: volume/intent]<br>- [keyword 7] [brief note: volume/intent]<br>- [keyword 8] [brief note: volume/intent]<br>- [keyword 9] [brief note: volume/intent]<br>- [keyword 10] [brief note: volume/intent] | 1) [headline text]<br>2) [headline text]<br>3) [headline text]<br>4) [headline text]<br>5) [headline text]<br>6) [headline text]<br>7) [headline text]<br>8) [headline text]<br>9) [headline text]<br>10) [headline text] | 1) [description text]<br>2) [description text]<br>3) [description text]<br>4) [description text] |

Repeat the table above for **Ad Group 2** and **Ad Group 3 (optional)**.

### Character Count Validation (must‑do)
After drafting creatives, re-calculate character counts and correct anything over the limits:
- **Headlines:** must be ≤ 30 characters
- **Descriptions:** must be ≤ 90 characters

If any headline/description exceeds the limit, rewrite succinctly to fit, preserving meaning and CTA.

### Quality Checklist (final pass)
- **Relevance:** keywords and copy align to the ad group’s theme/intent
- **Coverage:** ≥10 keywords; 10 headlines; 4 descriptions per ad group
- **Compliance:** all headline/description lengths within limits (validated)
- **Clarity & CTA:** benefits and next action are obvious
- **Duplication:** avoid repetitive phrasing across headlines/descriptions

