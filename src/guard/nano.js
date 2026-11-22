import { deviceModel } from '../firebase.js';
import { verifyNames } from '../pipeline.js';

const OPTS = { expectedInputs: [{ type: 'text', languages: ['en'] }], expectedOutputs: [{ type: 'text', languages: ['en'] }] };

/** 'available' | 'downloadable' | 'downloading' | 'unavailable' (also when the Prompt API is missing). */
export async function nanoAvailability() {
  try {
    if (typeof LanguageModel === 'undefined') return 'unavailable';
    return await LanguageModel.availability(OPTS);
  } catch {
    return 'unavailable';
  }
}

export async function initNano(onProgress) {
  await deviceModel.initializeDeviceModel(onProgress); // must follow a user click
}

const PROMPT =
  'List every personal name (patients, relatives, clinicians, neighbours) that appears in this clinical note, exactly as written. ' +
  'Do not list places, drugs or conditions. Return JSON {"names": [...]}.\n\nNOTE:\n';

// Reported by the Firebase AI Logic SDK ('on_device' expected: the model is created with ONLY_ON_DEVICE).
let lastDeviceSource = null;
export const getLastDeviceSource = () => lastDeviceSource;
export async function detectNames(text) {
  const res = await deviceModel.generateContent(PROMPT + text);
  lastDeviceSource = res.response.inferenceSource ?? 'not reported';
  let names = [];
  try {
    names = JSON.parse(res.response.text()).names ?? [];
  } catch {
    names = [];
  }
  return verifyNames(text, names);
}
