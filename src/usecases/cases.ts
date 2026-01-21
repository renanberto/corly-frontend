import { CasesRepository } from '@/usecases/ports/CasesRepository';

export const listCases = (repo: CasesRepository) => {
  return repo.list;
};

export const getCaseDetail = (repo: CasesRepository) => {
  return repo.getById;
};

export const createCase = (repo: CasesRepository) => {
  return repo.create;
};
