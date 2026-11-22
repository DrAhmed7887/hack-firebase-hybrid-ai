// Firebase AI Logic hybrid setup. Config comes from VITE_* env vars (never committed). With no config the app runs LOCAL-ONLY:
// the on-device model can still be used, the cloud backend is a labelled mock, App Check is off.
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { getAI, GoogleAIBackend, getGenerativeModel, InferenceMode, Schema } from 'firebase/ai';

const env = import.meta.env;
export const CLOUD_MODEL = env.VITE_CLOUD_MODEL || 'gemini-3.5-flash-lite'; // free tier model, see README

const config = env.VITE_FIREBASE_API_KEY
  ? {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    }
  : null;

export const status = { configured: !!config, appCheck: false, cloudModel: CLOUD_MODEL };

// Placeholder config is used ONLY so the SDK object exists for on-device inference; it can never reach a real project.
const app = initializeApp(config ?? { apiKey: 'local-only', projectId: 'local-only', appId: 'local-only' });

if (config && env.VITE_RECAPTCHA_SITE_KEY) {
  if (env.DEV) self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // dev only: the SDK prints a token to register in the console; none is stored here
  initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(env.VITE_RECAPTCHA_SITE_KEY), isTokenAutoRefreshEnabled: true });
  status.appCheck = true;
}

const ai = getAI(app, { backend: new GoogleAIBackend() });

const NAMES_SCHEMA = { type: 'object', properties: { names: { type: 'array', items: { type: 'string' } } }, required: ['names'] };

// Names in prose: raw text goes ONLY to this model. ONLY_ON_DEVICE throws instead of falling back to the cloud.
export const deviceModel = getGenerativeModel(ai, {
  mode: InferenceMode.ONLY_ON_DEVICE,
  onDeviceParams: {
    createOptions: { expectedInputs: [{ type: 'text', languages: ['en'] }], expectedOutputs: [{ type: 'text', languages: ['en'] }] },
    promptOptions: { responseConstraint: NAMES_SCHEMA },
  },
});

// Cloud: receives only text that passed the leak guard (see src/cloud/egress.js).
// Cloud only with App Check on: the hackathon requires it, and an unprotected endpoint should not be reachable.
const cloudModel = config && status.appCheck
  ? getGenerativeModel(ai, {
      mode: InferenceMode.PREFER_IN_CLOUD,
      inCloudParams: {
        model: CLOUD_MODEL,
        generationConfig: { responseMimeType: 'application/json', responseSchema: responseSchema() },
      },
    })
  : null;

function responseSchema() {
  return Schema.object({
    properties: {
      ckd_stage: Schema.enumString({ enum: ['G1', 'G2', 'G3a', 'G3b', 'G4', 'G5'] }),
      egfr: Schema.number(),
      albuminuria_category: Schema.enumString({ enum: ['A1', 'A2', 'A3', 'not_documented'] }),
      evidence: Schema.string(),
    },
  });
}

// inferenceSource is reported by the Firebase AI Logic SDK on every response: 'in_cloud' or 'on_device'.
// PREFER_IN_CLOUD may fall back to the device, so the app shows what actually answered instead of assuming.
let lastCloudSource = null;
export const getLastCloudSource = () => lastCloudSource;
export async function cloudGenerate(request) {
  const res = await cloudModel.generateContent(request);
  lastCloudSource = res.response.inferenceSource ?? 'not reported';
  return res.response.text();
}
export const hasCloud = () => !!cloudModel;
