export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-stone-200 dark:bg-stone-800 rounded-sm" />
      <div className="pt-3 space-y-2">
        <div className="h-2.5 w-16 bg-stone-200 dark:bg-stone-700 rounded" />
        <div className="h-3.5 w-32 bg-stone-200 dark:bg-stone-700 rounded" />
        <div className="h-3 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
      {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  )
}