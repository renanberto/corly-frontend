import { httpClient } from '@/infrastructure/http/client';
import { PublicRepository } from '@/usecases/ports/PublicRepository';

export const PublicRepositoryHttp: PublicRepository = {
  async getPlans() {
    return httpClient('/public/plans');
  }
};
