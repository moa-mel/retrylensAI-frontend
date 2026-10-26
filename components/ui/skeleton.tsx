export function Skeleton({ height = 100 }: { height?: number }) {
  return <div className="skeleton" style={{ height }} aria-label="Loading" role="status" />;
}