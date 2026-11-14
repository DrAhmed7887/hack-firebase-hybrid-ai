# CLAUDE.md: hack-firebase-hybrid-ai

#BuildHybridAI entry (Firebase AI Logic). Read README.md first. Global rules in ~/.claude/CLAUDE.md apply.

## Web code
- Use the `modern-web-guidance` skill (Google Chrome plugin, installed on both laptops) for any HTML, CSS or JS. Add "use modern-web-guidance" to prompts to force it.
- **Browser Support:** latest Chrome stable is the demo target. Allow Baseline Newly Available features when feature-detected with graceful degradation; no polyfills; no new dependency where the platform already does the job.

## Hardware limit (checked 14 Nov 2026)
- Chrome's on-device model (Prompt API / Gemini Nano) needs 16 GB RAM, 4+ cores and 22 GB free disk (skill guide `built-in-ai/prompt-api.md`). Both laptops are M1 with 8 GB, so on-device Web inference cannot be demoed on them. Pick the on-device platform with that in mind.

## Hard rules
- Synthetic data only, fake seeded identifiers. No real patient data.
- Spark plan only; no Blaze, no billing account. Any Firebase project creation, cloud call or quota request needs Ahmed's OK for that exact action.
- No compliance, de-identification or clinical-performance claims.
