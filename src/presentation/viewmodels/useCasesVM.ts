import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CasesRepositoryHttp } from '@/infrastructure/repositories/CasesRepositoryHttp';
import { createCase, getCaseDetail, listCases } from '@/usecases/cases';

const listUsecase = listCases(CasesRepositoryHttp);
const detailUsecase = getCaseDetail(CasesRepositoryHttp);
const createUsecase = createCase(CasesRepositoryHttp);

export const useCasesListVM = (filters: {
  status?: string;
  blocked?: boolean;
  assignedToMe?: boolean;
  dueFrom?: string;
  dueTo?: string;
  externalParty?: string;
}) => {
  return useQuery({
    queryKey: ['cases', filters],
    queryFn: () => listUsecase(filters)
  });
};

export const useCaseDetailVM = (id: string) => {
  return useQuery({
    queryKey: ['cases', id],
    queryFn: () => detailUsecase(id),
    enabled: Boolean(id)
  });
};

export const useCreateCaseVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUsecase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });
};
