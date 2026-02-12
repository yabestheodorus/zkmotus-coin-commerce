function ProductDetailSkeleton() {
  return (
    <main className="text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 animate-pulse">

        {/* Image skeleton */}
        <div className="space-y-6">
          <div className="h-105 w-full rounded-3xl bg-ink/5" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 w-20 rounded-xl bg-ink/5"
              />
            ))}
          </div>
        </div>

        {/* Text skeleton */}
        <div className="flex flex-col space-y-6">
          <div className="h-4 w-24 bg-ink/5 rounded" />
          <div className="h-10 w-3/4 bg-ink/5 rounded" />

          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-ink/5 rounded" />
            ))}
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full bg-ink/5 rounded" />
            <div className="h-4 w-5/6 bg-ink/5 rounded" />
            <div className="h-4 w-2/3 bg-ink/5 rounded" />
          </div>

          <div className="h-6 w-32 bg-ink/5 rounded mt-6" />

          <div className="flex gap-4 mt-8">
            <div className="h-12 w-32 bg-ink/5 rounded-xl" />
            <div className="h-12 flex-1 bg-ink/5 rounded-xl" />
            <div className="h-12 w-12 bg-ink/5 rounded-xl" />
          </div>

          <div className="h-px bg-ink/5 my-8" />

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-ink/5 rounded" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailSkeleton