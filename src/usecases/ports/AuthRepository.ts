import { UserProfile, TrialUsage } from '@/domain/models';

export interface AuthRepository {
  login(payload: { email: string; password: string }): Promise<{ accessToken: string; user: UserProfile }>;
  signup(payload: {
    companyName: string;
    name: string;
    email: string;
    password: string;
  }): Promise<{ accessToken: string; user: UserProfile }>;
  refresh(): Promise<{ accessToken: string; user: UserProfile }>;
  me(): Promise<{ user: UserProfile; trial: TrialUsage }>; 
  logout(): Promise<void>;
}
