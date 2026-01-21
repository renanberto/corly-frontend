import { Button, Card } from '@heroui/react';

export const EmptyState = ({
  title,
  description,
  ctaLabel,
  onCta
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  onCta?: () => void;
}) => {
  return (
    <Card className="p-6 text-center space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
      {ctaLabel && onCta && (
        <Button color="primary" onPress={onCta}>
          {ctaLabel}
        </Button>
      )}
    </Card>
  );
};
