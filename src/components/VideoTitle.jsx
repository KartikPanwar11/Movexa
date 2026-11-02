
const VideoTitle = ({title, overview}) => {
  return (
    <div className="relative z-10 flex min-h-[min(86vh,58rem)] w-full items-end px-5 pb-12 pt-32 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent" />
      <div className="relative max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          Featured tonight
        </p>
        <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white drop-shadow-2xl sm:text-6xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-6 text-zinc-200/90 drop-shadow sm:text-base sm:leading-7">
          {overview}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/35 bg-white/15 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.45),0_8px_30px_rgb(0_0_0_/_0.25)] backdrop-blur-xl transition duration-300 hover:border-white/60 hover:bg-white/25 hover:shadow-[inset_0_1px_1px_rgb(255_255_255_/_0.65),0_10px_35px_rgb(0_0_0_/_0.35)] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-900">
            <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <span className="absolute -inset-y-8 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[500%]" />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle
