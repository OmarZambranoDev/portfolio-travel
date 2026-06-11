import { SkeletonCard, SkeletonGrid } from '@OmarZambranoDev/portfolio-ui';

export default function DestinationLoading() {
  return (
    <div className="flex flex-col gap-8">
      <SkeletonCard />
      <SkeletonGrid items={3} columns={3} />
    </div>
  );
}
