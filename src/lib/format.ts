export const formatCurrency = (value: number, currency: string = 'BRL') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercent = (value: number, maximumFractionDigits = 1) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits
  }).format(value / 100);
};

export const formatCompactNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

export const formatDate = (value: string | number | Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
};
