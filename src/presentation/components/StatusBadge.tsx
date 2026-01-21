import { Badge } from '@heroui/react';
import { CaseStatus, DocumentStatus } from '@/domain/models';

const statusColor: Record<string, 'primary' | 'success' | 'warning' | 'danger'> = {
  OPEN: 'primary',
  BLOCKED: 'danger',
  DONE: 'success',
  PENDING: 'warning',
  SUBMITTED: 'primary',
  APPROVED: 'success',
  REJECTED: 'danger',
  EXPIRED: 'warning'
};

export const StatusBadge = ({ status }: { status: CaseStatus | DocumentStatus }) => {
  return (
    <Badge color={statusColor[status]} variant="flat">
      {status}
    </Badge>
  );
};
