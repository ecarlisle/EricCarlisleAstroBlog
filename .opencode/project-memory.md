# 🧠 Project Memory & Architectural Decisions

> **System Note for OpenCode Agents:** This is an active log of established code patterns, configuration rules, and approved schemas for this Astro project. Read this file before proposing changes, and update it whenever a major architectural decision or bug resolution occurs.

---

## 🏗️ Current Approved Architecture
* **Framework:** Astro (v5+ Static Site Generation)
* **Styling:** Tailwind CSS (Strictly semantic utility layout, no arbitrary pixel values or inline style wrappers)
* **Type Safety:** Content Collections configured via `src/content/config.ts`

## 🎨 Design Tokens & UI Constraints
* *No design tokens registered yet.*

## ♿ Accessibility (WCAG 2.1 AA) Rules
* All interactive elements require visible `:focus-visible` ring parameters.
* Always check color contrast ratios before outputting Tailwind button utilities.
* All icons/SVGs must include explicit `aria-hidden="true"` tags unless functioning as a standalone interactive text alternative.

## 📝 Ongoing Notes & Solved Bugs
* *(Agent: Log solved compilation blocks, directory adjustments, or architectural refinements here as you build.)*
