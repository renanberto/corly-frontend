import { httpClient } from '@/infrastructure/http/client';
import { AuthRepository } from '@/usecases/ports/AuthRepository';

export const AuthRepositoryHttp: AuthRepository = {
  async login(payload) {
    return httpClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  async signup(payload) {
    return httpClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  async refresh() {
    return httpClient('/auth/refresh', { method: 'POST' });
  },
  async me() {
    return httpClient('/auth/me');
  },
  async logout() {
    await httpClient('/auth/logout', { method: 'POST' });
  }
};
