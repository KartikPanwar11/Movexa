import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBg = ({movieId}) => {

    const trailerVideo = useSelector(store=> store.movies?.trailerVideo);
    useMovieTrailer(movieId);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
      {trailerVideo?.key && (
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] object-cover opacity-80 sm:scale-[1.3]"
          src={`https://www.youtube-nocookie.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&playsinline=1&loop=1&playlist=${trailerVideo.key}&vq=hd1080&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&autohide=1`}
          title="Featured movie trailer"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default VideoBg
