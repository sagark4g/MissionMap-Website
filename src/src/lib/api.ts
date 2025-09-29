// src/lib/api.ts
import { API_BASE, USE_STUB } from "../config";

export type PreviewResponse = {
  ok: boolean;
  data?: {
    title: string;
    mission: string;
    thisWeek: string[];
    hook?: string;
  };
  error?: string;
  source?: "stub" | "ai";
};

// Health check function
export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/preview`, {
      method: "OPTIONS",
      headers: { "Accept": "application/json" }
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function postPreview(
  packId: string,
  subpackId: string,
  answers: Record<string, any>,
  opts?: { debugStub?: boolean }
): Promise<PreviewResponse> {
  const payload: any = { packId, subpackId, answers };
  if (opts?.debugStub) payload.debug_stub = true;

  const apiUrl = `${API_BASE}/api/preview`;
  console.log('[API] Calling:', apiUrl);
  console.log('[API] Payload:', { packId, subpackId, answerCount: Object.keys(answers).length, debugStub: opts?.debugStub });

  let res: Response;
  try {
    res = await fetch(apiUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload),
      // IMPORTANT: do not send credentials; our API is public with CORS
    });
  } catch (networkError) {
    console.error('[API] Network error:', networkError);
    throw new Error(`Network error: ${networkError.message}`);
  }

  console.log('[API] Response status:', res.status);
  console.log('[API] Response headers:', Object.fromEntries(res.headers.entries()));

  let json: PreviewResponse | null = null;
  let responseText = '';
  
  try {
    responseText = await res.text();
    console.log('[API] Raw response:', responseText);
    json = JSON.parse(responseText);
  } catch (e) {
    console.error('[API] Failed to parse JSON:', e);
    console.error('[API] Raw response was:', responseText);
    throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 200)}`);
  }

  if (!res.ok) {
    console.error('[API] HTTP error:', res.status, json);
    throw new Error(json?.error || `HTTP ${res.status}: ${responseText}`);
  }
  
  if (!json?.ok) {
    console.error('[API] API error:', json);
    throw new Error(json?.error || "API returned ok: false");
  }
  
  console.log('[API] Success:', json);
  return json!;
}

// Generate preview function as specified in the requirements
const STUB_PREVIEW = {
  title: "Your personalized plan",
  mission: "Move daily, eat smart, sleep on time.",
  hook: "We picked simple tasks to start.",
  thisWeek: ["Walk 20 min", "Protein at lunch", "Water 2L", "Lights out 10 pm"]
};

export async function generatePreview(packId: string, subpackId: string, answers: any) {
  if (USE_STUB) return STUB_PREVIEW;

  const r = await fetch(`${API_BASE}/api/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packId, subpackId, answers })
  });

  // Always try to parse JSON; API always returns JSON
  const j = await r.json().catch(() => null);

  // Surface real reason while stabilizing
  if (!r.ok || !j?.ok) {
    const msg = j?.error_detail || j?.error || `HTTP ${r.status}`;
    throw new Error(msg);
  }
  return j.data; // { title, mission, hook, thisWeek: string[] }
}