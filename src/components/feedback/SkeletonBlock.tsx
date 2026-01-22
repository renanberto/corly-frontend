interface SkeletonBlockProps {
  className?: string;
}

export const SkeletonBlock = ({ className = '' }: SkeletonBlockProps) => {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
};
