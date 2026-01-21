# Corly Frontend

Frontend SaaS para orquestração documental em operações imobiliárias. O foco é operação, documentação, estados, prazos, dependências e bloqueios (não é CRM).

## Stack
- React 18 + TypeScript
- Vite
- React Router
- TanStack Query
- Zustand (session/UI)
- react-hook-form + zod
- HeroUI + Tailwind utilities
- Vitest + Testing Library

## Estrutura (Clean Model)
```
src/
  app/                # bootstrap (router, providers, theme)
  domain/             # entidades e tipos
  usecases/           # regras de aplicação
  infrastructure/     # http client, repositórios, mappers
  presentation/       # UI, pages, layouts, viewmodels
```

## Configuração de ambiente
Crie um arquivo `.env` a partir de `.env.example`:
```
VITE_API_URL=https://api.localhost
VITE_PUBLIC_SITE_URL=https://landing.localhost
```

### Tokens e sessão
- O access token é armazenado em `localStorage` (fallback) e o refresh token deve ser mantido em cookie httpOnly quando o backend suportar.
- Em 401, o client tenta refresh uma vez e reexecuta a request. Se falhar, faz logout e redireciona para `/login`.

## Rodando localmente (fora do Docker)
```
npm install
npm run dev
```
- Acesse `http://localhost:5173` para desenvolvimento direto.

## Docker + Traefik
Este frontend foi preparado para compor com o backend via Traefik.

### Pré-requisito de TLS local
Siga o mesmo processo do backend (mkcert) para gerar certificados e configurar o Traefik.

### Subir em modo dev (hot reload)
```
docker compose -f docker-compose.front.yml --profile dev up --build
```
- `https://landing.localhost`
- `https://app.localhost`

### Subir em modo prod-local (build + nginx)
```
docker compose -f docker-compose.front.yml --profile prod-local up --build
```

## Troubleshooting
- **CORS**: confirme que o backend permite `Origin` de `https://landing.localhost` e `https://app.localhost`.
- **Cookies**: para refresh token em cookie httpOnly, habilite `SameSite=None` e `Secure` (TLS local ativo).
- **Token expirado**: o frontend tenta refresh uma vez. Se falhar, o usuário é redirecionado para `/login`.

## Fluxo de trial
- Landing e pricing consomem `GET /public/plans` para exibir `TRIAL_DAYS` e limites.
- Signup cria tenant e usuário e redireciona para onboarding.
- Banner persistente no app exibe dias restantes e uso vs. limites.

## Upload presigned (MVP)
Fluxo executado pela UI:
1. `POST /documents/{id}/upload-url`
2. `PUT` no `presigned_url`
3. `POST /documents/{id}/versions/confirm`

Para testar manualmente, use o Case Detail e envie um arquivo em um documento existente.

## TODOs
- Modo cliente final (portal)
- Assinatura eletrônica
- Templates avançados de processo
- Analytics operacionais
- Multilíngue
- Dark mode
