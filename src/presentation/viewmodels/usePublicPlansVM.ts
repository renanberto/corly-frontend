import { useQuery } from '@tanstack/react-query';
import { PublicRepositoryHttp } from '@/infrastructure/repositories/PublicRepositoryHttp';
import { getPublicPlans } from '@/usecases/public';

const getPlans = getPublicPlans(PublicRepositoryHttp);

export const usePublicPlansVM = () => {
  return useQuery({
    queryKey: ['public-plans'],
    queryFn: () => getPlans()
  });
};
