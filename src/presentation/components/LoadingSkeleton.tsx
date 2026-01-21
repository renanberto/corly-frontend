export const LoadingSkeleton = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 bg-slate-200 rounded" />
      ))}
    </div>
  );
};
