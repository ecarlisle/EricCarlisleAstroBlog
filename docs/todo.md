# AstroBlog — TODO: "Ready for Content" Checklist

## 🔴 Critical Gaps (Blocking "Ready for Content")

- [ ] **Contact page** — Create `/contact` route (referenced in `BaseHead` types, needed for lead gen & WCAG 2.4.6)
- [ ] **Tags index page** — Create `/tags/` page listing all tags with counts (discovery, SEO taxonomy, UX)
- [ ] **Newsletter/email capture** — Add signup form + integration (ConvertKit/Buttondown/Beehiiv) for audience ownership
- [ ] **Cookie consent / privacy banner** — GA4 via Partytown requires GDPR/CCPA consent before tracking

---

## 🟡 High-Impact UX/SEO

### Article Enhancements
- [ ] **Author box on articles** — Mini bio + links (E-E-A-T signal, personal brand) — currently only on `/about`
- [ ] **Related posts section** — Content graph based on tags/embeddings (increases dwell time, internal linking)
- [ ] **Reading progress label** — Add percentage label to progress bar (WCAG 1.3.1)

### Content Metadata
- [ ] **Enforce `updatedDate`** — Add to frontmatter schema validation + CI check for freshness signals
- [ ] **Per-post social images (OG)** — Replace fallback with generated/designed images per post (social CTR)
- [ ] **Series/part support** — Frontmatter field + UI for multi-part articles

### Technical SEO
- [ ] **Full-content RSS** — Current feed truncates; offer full content option for power users
- [ ] **Webmentions/IndieWeb** — Receive/display mentions (decentralized comments)
- [ ] **JSON Feed** — Alternative to RSS for modern readers

---

## 🟢 Readability/Polish

- [ ] **Verify reduced motion** — Ensure `@media (prefers-reduced-motion: reduce)` wraps all animations in `global.css`
- [ ] **Syntax highlighting theme switching** — Add light/dark theme toggle for code blocks (Expressive Code supports this)
- [ ] **Copy code button** — Verify Expressive Code copy button works (should be enabled by default)
- [ ] **Line numbers toggle** — Optional line numbers for code blocks
- [ ] **Anchor links on headings** — Hover-reveal `#` links for deep linking (currently TOC only)
- [ ] **Print stylesheet** — Clean print layout for articles

---

## 📋 Marketing/Growth

- [ ] **Comments system** — Giscus (GitHub Discussions) or Utterances (GitHub Issues) or self-hosted
- [ ] **Newsletter archive page** — `/newsletter` with past issues (if using Buttondown/Beehiiv)
- [ ] **Social proof** — Testimonials, subscriber count, "featured in" logos
- [ ] **Lead magnets** — PDF guides, checklists gated behind email
- [ ] **UTM tracking** — Auto-append UTM params to outbound links for attribution
- [ ] **Performance monitoring** — Lighthouse CI in GitHub Actions (budget enforcement)

---

## 🏗️ Infrastructure/DevEx

- [ ] **CI/CD pipeline** — GitHub Actions: typecheck → lint → build → deploy preview
- [ ] **Dependabot/Renovate** — Automated dependency updates
- [ ] **Visual regression** — Playwright + pixelmatch or Chromatic for design system
- [ ] **Edge middleware** — Geo-based redirects, A/B testing, auth preview
- [ ] **Image CDN** — Cloudinary/Imgix for hero images (auto-format, responsive)

---

## 📝 Content Operations

- [ ] **Editorial calendar** — Notion/Airtable/GitHub Projects integration
- [ ] **Draft/preview workflow** — `draft: true` frontmatter + preview deployment
- [ ] **Content audit script** — Check for: broken links, missing alt text, short descriptions, stale content
- [ ] **Style guide enforcement** — Vale/lint-md for prose consistency (terminology, tone, formatting)

---

## 🎯 Priority Order (Suggested)

| Phase | Items | Effort |
|-------|-------|--------|
| **1. Complete IA** | Contact page, Tags index | Low |
| **2. Authority Signals** | Author box on articles, updatedDate enforcement | Low-Med |
| **3. Growth Foundation** | Newsletter capture, Cookie consent | Med |
| **4. Engagement** | Related posts, Comments, Full RSS | Med |
| **5. Social/SEO** | Per-post OG images, Webmentions | Med-High |
| **6. Infrastructure** | CI/CD, Visual regression, Performance budgets | High |
| **7. Content Ops** | Editorial calendar, Draft workflow, Content audit | Ongoing |

---

## ✅ Already Done (Verified)

- [x] Astro 6 + TypeScript + vanilla CSS (OKLCH tokens)
- [x] Pagefind full-text search
- [x] Partytown for GA4 (third-party script off main thread)
- [x] Expressive Code syntax highlighting (dark-plus theme)
- [x] JSON-LD structured data (BlogPosting, CollectionPage, BreadcrumbList)
- [x] Open Graph + Twitter Cards
- [x] Sitemap + RSS feed
- [x] Dark mode (localStorage pre-paint, no flash)
- [x] Skip links, focus-visible, 44px touch targets
-18px targets
- [x] Reading progress bar + TOC (client-side, sticky)
- [x] Tag filtering (client-side, URL-synced)
- [x] Pagination (Astro native)
- [x] Image optimization (`<Image>` + Sharp)
- [x] 404 page with personality
- [x] About page with stats grid
- [x] Style guide page
- [x] Dead code eliminated (fallow clean)
- [x] Duplication refactored (shared components: TagFilterBar, PostGrid, blog-utils)

---

*Generated from audit on 2026-06-19. Update as items are completed.*