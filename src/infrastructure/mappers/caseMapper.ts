import { Case } from '@/domain/models';

export const mapCase = (payload: any): Case => ({
  id: payload.id,
  title: payload.title,
  status: payload.status,
  bank: payload.bank,
  dueAt: payload.due_at,
  participants: payload.participants ?? [],
  blockers: payload.blockers ?? [],
  documents: payload.documents ?? [],
  timeline: payload.timeline ?? []
});
