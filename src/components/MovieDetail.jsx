import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import useMovieDetails from "../hooks/useMovieDetails";
import { IMG_BASE_URL } from "../utils/constants";

const formatRuntime = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;
const formatMoney = (n) => (n ? `$${Math.round(n / 1e6)}M` : "Not known");
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const MovieDetail = () => {
  const { movieId } = useParams();
  const { movie, error } = useMovieDetails(movieId);

  // Opening another movie from "More like this" should start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  // Let the route's errorElement show the error page
  if (error) throw error;

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#08090b]">
        <Header />
      </div>
    );
  }

  const year = movie.release_date?.slice(0, 4);
  const crew = movie.credits.crew;
  const namesFor = (...jobs) => crew.filter((c) => jobs.includes(c.job)).map((c) => c.name).join(", ");
  const credits = [
    ["Director", namesFor("Director")],
    ["Writers", namesFor("Screenplay", "Writer")],
    ["Music", namesFor("Original Music Composer")],
  ].filter(([, names]) => names);
  const cast = movie.credits.cast.filter((c) => c.profile_path).slice(0, 12);
  const trailer = movie.videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
  const recommendations = movie.recommendations.results.filter((m) => m.poster_path).slice(0, 12);
  const facts = [
    ["Release date", movie.release_date && formatDate(movie.release_date)],
    ["Runtime", movie.runtime && `${movie.runtime} min`],
    ["Original language", movie.original_language.toUpperCase()],
    ["Budget", formatMoney(movie.budget)],
    ["Box office", formatMoney(movie.revenue)],
    ["Studios", movie.production_companies.slice(0, 3).map((c) => c.name).join(", ")],
  ].filter(([, value]) => value);

  return (
    <div className="min-h-screen bg-[#08090b] text-[#ededef]">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        {movie.backdrop_path && (
          <img
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
            src={IMG_BASE_URL + "w1280" + movie.backdrop_path}
            alt=""
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090b] via-[#08090b]/70 to-[#08090b]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/60" />

        <div className="relative mx-auto grid w-full max-w-6xl items-end gap-8 px-5 pb-12 pt-36 sm:px-10 md:grid-cols-[240px_minmax(0,1fr)] md:gap-11">
          {movie.poster_path && (
            <img
              className="w-36 rounded-xl shadow-[0_30px_80px_rgb(0_0_0_/_0.7)] ring-1 ring-white/10 md:w-full"
              src={IMG_BASE_URL + "w500" + movie.poster_path}
              alt={`${movie.title} poster`}
            />
          )}

          <div>
            <Link to="/browse" className="mb-4 inline-block text-sm text-[#a0a0a8] transition hover:text-white">
              ← Back to browse
            </Link>
            <h1 className="text-4xl font-bold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {movie.title}
            </h1>
            {movie.tagline && <p className="mt-3 italic text-[#a0a0a8]">{movie.tagline}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#a0a0a8]">
              {year && <span>{year}</span>}
              {movie.runtime > 0 && <span>{formatRuntime(movie.runtime)}</span>}
              <span className="font-medium text-white">
                <span className="text-amber-300">★</span> {movie.vote_average.toFixed(1)}
                <span className="font-normal text-[#6e6e76]"> / 10</span>
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g.id} className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                  {g.name}
                </span>
              ))}
            </div>

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-11 items-center gap-2 rounded-[10px] bg-[#ededef] px-5 text-sm font-medium text-[#0a0a0b] transition-opacity hover:opacity-90"
              >
                ▶ Play trailer
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-12">
          <section>
            <h2 className="mb-4 text-xl font-semibold">About the movie</h2>
            <p className="max-w-[66ch] leading-relaxed text-zinc-300">{movie.overview}</p>
            {credits.length > 0 && (
              <dl className="mt-6 grid gap-5 border-t border-[#232326] pt-6 sm:grid-cols-3">
                {credits.map(([label, names]) => (
                  <div key={label}>
                    <dt className="text-xs text-[#6e6e76]">{label}</dt>
                    <dd className="mt-1 text-sm">{names}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          {cast.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold">Cast</h2>
              <div className="flex gap-4 overflow-x-auto pb-3">
                {cast.map((person) => (
                  <div key={person.credit_id} className="w-32 shrink-0">
                    <img
                      className="mb-2 aspect-[3/4] w-full rounded-xl object-cover ring-1 ring-white/5"
                      src={IMG_BASE_URL + "w185" + person.profile_path}
                      alt={person.name}
                      loading="lazy"
                    />
                    <p className="text-sm font-medium leading-tight">{person.name}</p>
                    <p className="mt-0.5 text-xs leading-tight text-[#6e6e76]">{person.character}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {recommendations.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold">More like this</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {recommendations.map((rec) => (
                  <Link key={rec.id} to={`/movie/${rec.id}`} className="group">
                    <img
                      className="mb-2 aspect-[2/3] w-full rounded-lg object-cover ring-1 ring-white/5 transition group-hover:-translate-y-1"
                      src={IMG_BASE_URL + "w342" + rec.poster_path}
                      alt={`${rec.title} poster`}
                      loading="lazy"
                    />
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="text-xs text-[#6e6e76]">
                      {rec.release_date?.slice(0, 4)} · ★ {rec.vote_average.toFixed(1)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="h-fit rounded-2xl border border-[#232326] bg-[#121214] p-5">
          <h2 className="mb-4 text-sm font-semibold text-[#a0a0a8]">Details</h2>
          <dl className="space-y-3">
            {facts.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 text-sm">
                <dt className="shrink-0 text-[#6e6e76]">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <p className="mx-auto max-w-6xl border-t border-[#232326] px-5 py-6 text-xs text-[#6e6e76] sm:px-10">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
};

export default MovieDetail;
