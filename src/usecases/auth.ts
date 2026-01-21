import { AuthRepository } from '@/usecases/ports/AuthRepository';

export const login = (repo: AuthRepository) => repo.login;
export const signup = (repo: AuthRepository) => repo.signup;
export const refresh = (repo: AuthRepository) => repo.refresh;
export const fetchMe = (repo: AuthRepository) => repo.me;
export const logout = (repo: AuthRepository) => repo.logout;
