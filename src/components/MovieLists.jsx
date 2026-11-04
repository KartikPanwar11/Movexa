import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({title, movies}) => {

    console.log(movies)
    if (!movies?.length) return null;

    const scrollRef = useRef(null);

    const scroll = (direction) => {
      if (scrollRef.current) {
        const amount = scrollRef.current.clientWidth * 0.75;
        scrollRef.current.scrollBy({
          left: direction === "left" ? -amount : amount,
          behavior: "smooth",
        });
      }
    };

  return (
    <section className="group/section relative space-y-3">
      <h1 className="px-5 text-xl font-bold tracking-tight text-white sm:px-10 sm:text-2xl">
        {title}
      </h1>

      <div className="relative">
        {/* Left Liquid Glass Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="cursor-pointer absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white/40 active:scale-95 opacity-0 group-hover/section:opacity-100 focus:opacity-100"
        >
          <svg
            className="h-6 w-6 stroke-white drop-shadow"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scrollable Movies Row */}
        <div
          ref={scrollRef}
          className="scrollbar-none overflow-x-auto scroll-smooth px-5 sm:px-10 py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-3 sm:gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>

        {/* Right Liquid Glass Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="cursor-pointer absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-white/40 active:scale-95 opacity-0 group-hover/section:opacity-100 focus:opacity-100"
        >
          <svg
            className="h-6 w-6 stroke-white drop-shadow"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default MovieLists
