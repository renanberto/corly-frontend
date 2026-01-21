import { Card } from '@heroui/react';
import { TimelineEvent } from '@/domain/models';

export const TimelineItem = ({ item }: { item: TimelineEvent }) => {
  return (
    <Card className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase text-slate-500">{item.type}</span>
        <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</span>
      </div>
      <p className="text-sm text-slate-700">{item.description}</p>
      {item.actor && <p className="text-xs text-slate-500">por {item.actor.name}</p>}
    </Card>
  );
};
