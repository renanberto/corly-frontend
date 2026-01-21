import { httpClient } from '@/infrastructure/http/client';
import { mapCase } from '@/infrastructure/mappers/caseMapper';
import { CasesRepository } from '@/usecases/ports/CasesRepository';

export const CasesRepositoryHttp: CasesRepository = {
  async list(params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
    const data = await httpClient<any[]>(`/cases?${query.toString()}`);
    return data.map(mapCase);
  },
  async getById(id) {
    const data = await httpClient<any>(`/cases/${id}`);
    return mapCase(data);
  },
  async create(payload) {
    const data = await httpClient<any>('/cases', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return mapCase(data);
  }
};
