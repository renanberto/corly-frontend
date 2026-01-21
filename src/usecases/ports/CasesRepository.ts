import { Case } from '@/domain/models';

export interface CasesRepository {
  list(params: {
    status?: string;
    blocked?: boolean;
    assignedToMe?: boolean;
    dueFrom?: string;
    dueTo?: string;
    externalParty?: string;
  }): Promise<Case[]>;
  getById(id: string): Promise<Case>;
  create(payload: { title: string; bank: string }): Promise<Case>;
}
