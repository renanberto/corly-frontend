export type CaseStatus = 'OPEN' | 'BLOCKED' | 'DONE';
export type DocumentStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type BlockerType = 'DOCUMENT' | 'BANK' | 'CLIENT' | 'INTERNAL';

export interface Participant {
  id: string;
  name: string;
  role: string;
}

export interface Blocker {
  id: string;
  type: BlockerType;
  description: string;
  startedAt: string;
  assignedTo?: Participant;
  documentId?: string;
  suggestedAction?: string;
}

export interface DocumentVersion {
  id: string;
  createdAt: string;
  createdBy: Participant;
  storageKey: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  status: DocumentStatus;
  owner: Participant;
  responsible: Participant;
  dueAt?: string;
  expiresAt?: string;
  lastTransitionAt?: string;
  versions: DocumentVersion[];
}

export interface TimelineEvent {
  id: string;
  type: 'STATE_CHANGE' | 'ALERT' | 'EXPIRATION' | 'COMMENT';
  createdAt: string;
  description: string;
  actor?: Participant;
}

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  bank: string;
  dueAt?: string;
  participants: Participant[];
  blockers: Blocker[];
  documents: Document[];
  timeline: TimelineEvent[];
}

export interface Alert {
  id: string;
  caseId?: string;
  message: string;
  createdAt: string;
  read: boolean;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface TrialPlan {
  trialDays: number;
  trial_limits: {
    max_cases: number;
    max_documents: number;
    max_users: number;
  };
}

export interface TrialUsage {
  daysRemaining: number;
  casesUsed: number;
  documentsUsed: number;
  usersUsed: number;
  isExpired: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}
