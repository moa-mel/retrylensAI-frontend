export interface IncidentSummary {
  // The backend's fetchIncidents() currently returns a numeric Prisma ID.
  id: number;
  title: string;
  statusCode: number;
  timestamp: string;
  analyzed: boolean;
  replayVerified: boolean;
}

export interface IncidentDiagnosis {
  [key: string]: unknown;
}

export interface ReplayResult {
  mode: "broken" | "fixed";
  scenario: string;
  ranAt: string;
  passed: boolean;
  assertions: unknown;
  executionLog: string[];
}

export interface Incident {
  // The backend view() currently serializes row.id to a string.
  id: string;
  title: string;
  method: string;
  path: string;
  statusCode: number;
  requestId: string;
  timestamp: string;
  headers: Record<string, string>;
  payload: Record<string, unknown>;
  responseBody: Record<string, unknown>;
  logs: string[];
  scenario: string;
  diagnosis?: IncidentDiagnosis;
  diagnosisEvidenceChecked?: boolean;
  replayVerified: boolean;
  lastReplay?: ReplayResult;
}