import { Button } from '@0xintuition/1ui'

export default function Maintenance() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#060504] via-black to-[#101010] p-4">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading - Left on mobile, centered on desktop */}
        <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-medium mb-6 md:mb-8 leading-tight text-left sm:text-center max-w-3xl w-full mx-auto">
          <span className="bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent inline-block sm:whitespace-nowrap">
            The Next Chapter of Intuition Is Here
          </span>
        </h1>

        {/* Unified text block - Left aligned */}
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 font-light max-w-3xl w-full mx-auto mb-8 md:mb-12 space-y-3 sm:space-y-4 md:space-y-6 text-left">
          <p className="leading-relaxed">
            The Intuition Protocol is evolving into the Intuition Network — a
            faster, smarter, and more powerful foundation for the future of
            verifiable knowledge.
          </p>

          <p className="leading-relaxed">
            We're migrating to our new home, and when we return, you'll
            experience a network that unlocks entirely new ways to create,
            connect, and discover truth.
          </p>

          <p className="leading-relaxed">Stay tuned — the future is loading…</p>
        </div>

        {/* CTA Button - Left aligned */}
        <div className="max-w-3xl w-full mx-auto">
          <a href="https://medium.com/0xintuition/intuition-the-great-migration-43b5be292ef0" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button
              variant="primary"
              size="lg"
            >
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}