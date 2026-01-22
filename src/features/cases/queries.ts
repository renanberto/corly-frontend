import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { casesApi } from '@/features/cases/api';
import { queryKeys } from '@/lib/queryKeys';

export interface CasesListFilters {
  status?: string;
  blocked?: boolean;
  assignedToMe?: boolean;
  dueFrom?: string;
  dueTo?: string;
  externalParty?: string;
}

export const useCasesList = (filters: CasesListFilters) => {
  return useQuery({
    queryKey: queryKeys.cases.list(filters),
    queryFn: () => casesApi.list(filters),
    staleTime: 30_000,
    placeholderData: keepPreviousData
  });
};

export const useCaseDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.cases.detail(id),
    queryFn: () => casesApi.detail(id),
    enabled: Boolean(id)
  });
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: casesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all });
    }
  });
};
