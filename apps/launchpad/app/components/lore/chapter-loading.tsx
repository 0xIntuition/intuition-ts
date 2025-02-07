import { motion } from 'framer-motion'

export function ChapterLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Skeleton */}
      <div className="relative w-full h-[40vh] overflow-hidden bg-background/50">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-primary/5 to-background" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <div className="h-12 w-2/3 bg-primary/10 rounded animate-pulse" />
            <div className="h-6 w-1/3 bg-primary/10 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <motion.div
        className="max-w-4xl mx-auto px-8 py-12 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Title skeleton */}
        <div className="h-8 w-3/4 bg-primary/10 rounded animate-pulse" />

        {/* Paragraph skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-full bg-primary/5 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-primary/5 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-primary/5 rounded animate-pulse" />
          </div>
        ))}
      </motion.div>

      {/* Navigation Skeleton */}
      <div className="fixed bottom-8 left-0 right-0">
        <div className="max-w-4xl mx-auto px-8 flex justify-between items-center">
          <div className="w-32 h-12 bg-primary/5 rounded animate-pulse" />
          <div className="hidden md:block w-24 h-8 bg-primary/5 rounded animate-pulse" />
          <div className="w-32 h-12 bg-primary/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
