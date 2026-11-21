import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiSearch } from "../utils/aiSlice";
import { IMG_BASE_URL } from "../utils/constants";
import AiMovieSuggestions from "./AiMovieSuggestions";

// Starter ideas shown under the search bar
const starterIdeas = [
  "Cozy rainy-day films",
  "Smart sci-fi",
  "Feel-good comedies",
  "Thrillers with a twist",
];

const AiSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [paused, setPaused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setError("Type something or pick an idea below.");
      inputRef.current.focus();
      return;
    }
    setError("");
    // TODO: send `query` to the AI here and show the results
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError("");
  };

  // Clicking an idea puts it in the search bar
  const handleIdeaClick = (idea) => {
    setQuery(idea);
    setError("");
    inputRef.current.focus();
  };

  const handleBackClick = () => {
    dispatch(toggleAiSearch());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08090b]">
      <PosterWall paused={paused} />

      <button
        type="button"
        onClick={() => setPaused(!paused)}
        className="fixed bottom-4 right-4 z-20 h-[34px] rounded-[9px] border border-[#323236] bg-[#141416]/90 px-3 text-xs text-[#a0a0a8] transition hover:text-white"
      >
        {paused ? "Play posters" : "Pause posters"}
      </button>

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-20 pt-36 text-center sm:pt-44">
        {/* Back button */}
        <div className="mb-10 flex justify-center">
          <button
            onClick={handleBackClick}
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            ← Back to browse
          </button>
        </div>

        {/* Heading */}
        <h1 className="mx-auto mb-4 max-w-[14ch] text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
          Tell us the{" "}
          <span className="text-violet-300">vibe.</span>{" "}
          We'll find the movie.
        </h1>
        <p className="mx-auto mb-8 max-w-md text-base text-zinc-400">
          Describe a mood, a plot, or a film you loved. Our AI reads between the lines and picks what fits.
        </p>

        {/* Search bar */}
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex h-[60px] items-center gap-2.5 rounded-full border border-[#323236] bg-[#141416] pl-5 pr-2 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04),0_16px_48px_rgb(0_0_0_/_0.4)] transition-colors focus-within:border-[#4a4a50]"
          >
            <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6e6e76]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              autoFocus
              aria-label="What are you in the mood for?"
              placeholder="What are you in the mood for?"
              className="min-w-0 flex-1 bg-transparent text-base text-[#ededef] outline-none placeholder:text-[#6e6e76]"
            />

            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#ededef] px-3.5 text-sm font-medium text-[#0a0a0b] transition-opacity hover:opacity-90 sm:px-[18px]"
            >
              <span className="hidden sm:inline">Search</span>
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          {/* Error message */}
          <p role="alert" className="mt-2.5 min-h-5 text-center text-[13px] text-red-300">
            {error}
          </p>

          {/* Starter ideas */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {starterIdeas.map((idea) => (
              <button
                key={idea}
                type="button"
                onClick={() => handleIdeaClick(idea)}
                className="h-8 rounded-full border border-[#232326] bg-transparent px-[13px] text-[13px] text-[#a0a0a8] transition hover:border-[#323236] hover:bg-[#141416] hover:text-[#ededef]"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AiMovieSuggestions />
    </div>
  );
};

// Slowly drifting wall of posters from the movies already loaded on Browse
const PosterWall = ({ paused }) => {
  const movies = useSelector((store) => store.movies);
  const allMovies = [
    ...(movies.nowPlayingMovies || []),
    ...(movies.popularMovies || []),
    ...(movies.topRatedMovies || []),
  ];
  const posters = [...new Set(allMovies.map((m) => m.poster_path).filter(Boolean))].slice(0, 28);

  // Split the posters into 7 columns, 4 each
  const columns = Array.from({ length: 7 }, (_, i) => posters.slice(i * 4, i * 4 + 4));

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -inset-x-[6%] -inset-y-[12%] grid rotate-[-7deg] scale-[1.08] grid-cols-4 gap-3.5 opacity-55 md:grid-cols-7">
        {columns.map((column, i) => (
          <div
            key={i}
            className={`poster-col flex-col gap-3.5 ${i >= 4 ? "hidden md:flex" : "flex"}`}
            style={{
              animationName: i % 2 ? "poster-fall" : "poster-rise",
              animationDuration: `${60 + (i % 3) * 10}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `-${i * 9}s`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {/* Each column is shown twice so the scroll loops without a gap */}
            {[...column, ...column].map((path, j) => (
              <img
                key={j}
                src={IMG_BASE_URL + "w342" + path}
                alt=""
                className="aspect-[2/3] w-full rounded-[10px] object-cover shadow-[0_10px_30px_rgb(0_0_0_/_0.5)]"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Darkest behind the text, lighter at the edges so the posters show */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 50% 46%, rgba(8,9,11,0.94) 0%, rgba(8,9,11,0.82) 45%, rgba(8,9,11,0.45) 100%), linear-gradient(180deg, rgba(8,9,11,0.85) 0%, rgba(8,9,11,0) 22%, rgba(8,9,11,0) 70%, rgba(8,9,11,1) 100%)",
        }}
      />
    </div>
  );
};

export default AiSearch;
