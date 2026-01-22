import { ReactNode } from 'react';
import { uiTokens } from '@/styles/tokens';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-2">
        <h1 className={uiTokens.typography.pageTitle}>{title}</h1>
        {description && <p className={uiTokens.typography.pageDescription}>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
