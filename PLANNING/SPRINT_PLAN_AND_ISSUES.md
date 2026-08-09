CyliaTales — Prioritized Execution Plan & Sprint Issue List

Overview
This document turns the product gaps identified in the repo into a concrete, prioritized 6‑sprint execution plan (2‑week sprints). Each sprint contains discrete issues (titles + short descriptions + acceptance criteria + estimates). Use this as a source of truth to create GitHub issues and milestones.

Assumptions
- Team: 3 engineers (full-stack/infra), 1 ML engineer, 1 designer, 1 product manager.
- Sprint length: 2 weeks.
- Goal: deliver a paying-customer MVP (limited scale) in ~8–12 weeks.

Milestones
- milestone/MVP-Ready (sprints 1–3): core infra, CI, frontend wiring, auth & billing, low-res pipeline
- milestone/Marketplace-Launch (sprints 4–5): templates/outfits pipeline, marketplace skeleton, demo assets
- milestone/Enterprise-Ready (sprint 6): security, SSO, compliance, monitoring, and production hardening

Sprint 1 (Weeks 1–2) — Stabilize & CI
- Issue: "CI: Add GitHub Actions pipeline (lint, unit tests, build)"
  - Description: Create GitHub Actions workflow to run lint, unit tests, and build on push/PR.
  - Acceptance: CI passes on the branch; failing tests block merge.
  - Estimate: 8–12 hours

- Issue: "Tests: Add unit tests and basic E2E smoke tests"
  - Description: Add testing scaffold (Jest/React Testing Library + a single Playwright/Puppeteer smoke test for preview page).
  - Acceptance: Unit tests cover key components; E2E smoke runs in CI.
  - Estimate: 2–3 days

- Issue: "Code quality: ESLint + Prettier, typescript config"
  - Description: Configure linting and formatting and fix critical lint errors.
  - Acceptance: CI enforces lint; PRs auto-format.
  - Estimate: 8 hours

Sprint 2 (Weeks 3–4) — Frontend & Auth MVP
- Issue: "App scaffold: Integrate HighFidelityBackground into Next.js app"
  - Description: Wire src/components/HighFidelityBackground into a Next.js page/layout with dynamic import (ssr: false).
  - Acceptance: Background loads on client; no SSR errors.
  - Estimate: 1 day

- Issue: "Auth MVP: Add email/password auth + session (Dev only)"
  - Description: Add minimal auth endpoints and frontend flows (login/register) using JWT sessions (dev-only, no SSO yet).
  - Acceptance: Users can sign up/login locally; session persists across pages.
  - Estimate: 2–3 days

- Issue: "Billing stub: Stripe sandbox integration (checkout flow)"
  - Description: Add Stripe test key integration and a sandbox checkout for Creator Pro subscription.
  - Acceptance: Test payments succeed; webhooks stubbed.
  - Estimate: 2 days

Sprint 3 (Weeks 5–6) — Render Infra MVP & Storage
- Issue: "Render job API + worker stub"
  - Description: Implement /render/preview queuing endpoint and a worker that picks jobs and writes to S3-compatible storage (local MinIO dev).
  - Acceptance: Submit preview job -> worker completes -> artifact stored and downloadable.
  - Estimate: 1 week

- Issue: "Storage: S3/MinIO integration + signed URL support"
  - Description: Add object storage backend with signed URL generation for artifacts.
  - Acceptance: Artifacts accessible via signed URLs with expiry.
  - Estimate: 2 days

- Issue: "Queue: Redis or RabbitMQ job queue" 
  - Description: Add reliable queue (bull/redis or RabbitMQ) with retries and basic metrics.
  - Acceptance: Jobs retried on failure; failure count visible in logs.
  - Estimate: 2–3 days

Sprint 4 (Weeks 7–8) — Story → Storyboard → TTS
- Issue: "Story generation API: improve prompt templates + beat-sheet output"
  - Description: Harden /generate/story endpoint with templated prompts, deterministic output shape, and sample unit tests.
  - Acceptance: Outputs consistent beat JSON and storyboard panel placeholders.
  - Estimate: 3 days

- Issue: "TTS integration + lip-sync pipeline (dev)"
  - Description: Integrate a TTS provider locally and generate simple viseme mapping for the preview pipeline.
  - Acceptance: Preview shows generated audio + approximate lip-sync markers.
  - Estimate: 4–6 days

Sprint 5 (Weeks 9–10) — Marketplace & Assets
- Issue: "Marketplace skeleton: templates & outfit ingestion"
  - Description: Add assets API and simple marketplace UI to browse/import templates/outfits.
  - Acceptance: Admin can upload a template; users can import a template into a project.
  - Estimate: 1 week

- Issue: "Seed assets: add 10 starter templates + 5 outfit packs"
  - Description: Populate marketplace with curated starter assets and metadata.
  - Acceptance: 10 templates visible in marketplace; each has preview gif and metadata.
  - Estimate: 3–4 days (designer + engineer)

Sprint 6 (Weeks 11–12) — Security, Observability, Enterprise
- Issue: "SSO & enterprise auth (SAML/OIDC)"
  - Description: Add SSO integration points and admin workspace settings (config only for pilot customers).
  - Acceptance: Test SAML/OIDC login for one enterprise test tenant.
  - Estimate: 1 week

- Issue: "Observability: Logging, metrics, alerting"
  - Description: Add structured logging, Prometheus metrics, and basic alerts for job queue failures and error rate.
  - Acceptance: Dashboards + at least two alert rules in place.
  - Estimate: 3 days

- Issue: "Security review & compliance checklist"
  - Description: Run basic threat model review, add rate-limiting, secrets rotation, and a privacy mode for enterprise.
  - Acceptance: Checklist completed and evidence added to repo.
  - Estimate: 3–4 days

How to use this file
- I can convert each issue into GitHub issues and attach them to Milestones: MVP-Ready, Marketplace-Launch, Enterprise-Ready.
- I can open the issues in one batch (if you confirm) and create the milestones and labels (priority:high, area:infra, area:frontend, etc.).

Next steps (pick one)
- A: Create GitHub issues & milestones now (I will open them in the repo).  
- B: Create a PR that adds this plan as a project board + issue templates.  
- C: I should first create the CI workflow and basic tests before opening issues.

