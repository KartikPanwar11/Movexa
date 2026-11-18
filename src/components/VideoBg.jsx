import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

// Load YouTube's IFrame Player API script once and reuse it
let youTubeApi;
const loadYouTubeApi = () => {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!youTubeApi) {
    youTubeApi = new Promise((resolve) => {
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    });
  }
  return youTubeApi;
};

const VideoBg = ({movieId}) => {

    const trailerVideo = useSelector(store=> store.movies?.trailerVideo);
    useMovieTrailer(movieId);

    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoKey = trailerVideo?.key;

    useEffect(() => {
      if (!videoKey) return;

      const wrapper = playerRef.current;
      let player;
      let showTimer;
      let cancelled = false;

      loadYouTubeApi().then((YT) => {
        if (cancelled) return;

        // YouTube replaces this element with its iframe, so give it a child React doesn't manage
        const target = document.createElement("div");
        wrapper.appendChild(target);

        player = new YT.Player(target, {
          videoId: videoKey,
          host: "https://www.youtube-nocookie.com",
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            cc_load_policy: 0,
          },
          events: {
            onReady: (e) => {
              e.target.mute();
              e.target.playVideo();
            },
            onStateChange: (e) => {
              // YouTube flashes a pause icon for ~1s whenever playback (re)starts,
              // so show the video only after 1s of playing and hide it instantly otherwise
              clearTimeout(showTimer);
              if (e.data === YT.PlayerState.PLAYING) {
                showTimer = setTimeout(() => setIsPlaying(true), 1000);
              } else {
                setIsPlaying(false);
              }

              // Loop by hand instead of loop=1&playlist, which shows next/prev buttons
              if (e.data === YT.PlayerState.ENDED) {
                e.target.seekTo(0);
                e.target.playVideo();
              }
            },
          },
        });
      });

      return () => {
        cancelled = true;
        clearTimeout(showTimer);
        player?.destroy();
        wrapper.innerHTML = "";
      };
    }, [videoKey]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
      {videoKey && (
        <div
          ref={playerRef}
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] sm:scale-[1.3] ${isPlaying ? "opacity-80 transition-opacity duration-700" : "opacity-0"}`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default VideoBg
