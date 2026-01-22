import { CasesRepositoryHttp } from '@/infrastructure/repositories/CasesRepositoryHttp';
import { createCase, getCaseDetail, listCases } from '@/usecases/cases';

const listUsecase = listCases(CasesRepositoryHttp);
const detailUsecase = getCaseDetail(CasesRepositoryHttp);
const createUsecase = createCase(CasesRepositoryHttp);

export const casesApi = {
  list: listUsecase,
  detail: detailUsecase,
  create: createUsecase
};
