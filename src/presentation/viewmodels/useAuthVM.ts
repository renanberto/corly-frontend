import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthRepositoryHttp } from '@/infrastructure/repositories/AuthRepositoryHttp';
import { fetchMe, login, logout, signup } from '@/usecases/auth';
import { sessionStore } from '@/presentation/viewmodels/useSessionStore';

const loginUsecase = login(AuthRepositoryHttp);
const signupUsecase = signup(AuthRepositoryHttp);
const meUsecase = fetchMe(AuthRepositoryHttp);
const logoutUsecase = logout(AuthRepositoryHttp);

export const useLoginVM = () => {
  const setAccessToken = sessionStore((state) => state.setAccessToken);
  const setUser = sessionStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUsecase,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
    }
  });
};

export const useSignupVM = () => {
  const setAccessToken = sessionStore((state) => state.setAccessToken);
  const setUser = sessionStore((state) => state.setUser);

  return useMutation({
    mutationFn: signupUsecase,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
    }
  });
};

export const useMeVM = () => {
  const setUser = sessionStore((state) => state.setUser);
  const setTrial = sessionStore((state) => state.setTrial);

  return useQuery({
    queryKey: ['me'],
    queryFn: meUsecase,
    onSuccess: (data) => {
      setUser(data.user);
      setTrial(data.trial);
    }
  });
};

export const useLogoutVM = () => {
  const clearSession = sessionStore((state) => state.logout);

  return useMutation({
    mutationFn: logoutUsecase,
    onSuccess: () => clearSession()
  });
};
