# CLAUDE.md: hack-firebase-hybrid-ai

#BuildHybridAI entry (Firebase AI Logic). Read README.md first. Global rules in ~/.claude/CLAUDE.md apply.

## Web code
- Use the `modern-web-guidance` skill (Google Chrome plugin, installed on both laptops) for any HTML, CSS or JS. Add "use modern-web-guidance" to prompts to force it.
- **Browser Support:** latest Chrome stable is the demo target. Allow Baseline Newly Available features when feature-detected with graceful degradation; no polyfills; no new dependency where the platform already does the job.

## Hardware note (checked 14 Nov 2026, updated 25 Nov 2026)
- Chrome's documented on-device model (Prompt API / Gemini Nano) requirements are 16 GB RAM, 4+ cores and 22 GB free disk (skill guide `built-in-ai/prompt-api.md`), but Chrome on the 8 GB M1 dev Mac reported `LanguageModel.availability() === 'available'` on 19 Nov 2026, so Nano can run there. Do not assume it on other machines: the app must keep its graceful rules-only fallback (and `?rules-only`) when it is unavailable, and CI never runs Nano.

## Hard rules
- Synthetic data only, fake seeded identifiers. No real patient data.
- Spark plan only; no Blaze, no billing account. Any Firebase project creation, cloud call or quota request needs Ahmed's OK for that exact action.
- No compliance, de-identification or clinical-performance claims.
