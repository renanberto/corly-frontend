export const queryKeys = {
  cases: {
    all: ['cases'] as const,
    list: (filters: Record<string, unknown>) => ['cases', 'list', filters] as const,
    detail: (id: string) => ['cases', 'detail', id] as const
  }
};
