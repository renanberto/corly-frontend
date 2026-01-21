import { TrialPlan } from '@/domain/models';

export interface PublicRepository {
  getPlans(): Promise<TrialPlan>;
}
