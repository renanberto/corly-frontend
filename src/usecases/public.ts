import { PublicRepository } from '@/usecases/ports/PublicRepository';

export const getPublicPlans = (repo: PublicRepository) => {
  return repo.getPlans;
};
