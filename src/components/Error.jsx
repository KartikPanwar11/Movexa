import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom";
import logoDark from "../assets/logo/movexa-dark.png";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();


  const isNotFound = !error || (isRouteErrorResponse(error) && error.status === 404);

  const errorDetails = error
    ? isRouteErrorResponse(error)
      ? `${error.status} ${error.statusText}`
      : `${error.message}\n\n${error.stack || ""}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(errorDetails).catch(() => {});
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#08090b] px-6 text-[#ededef] sm:px-10 lg:px-14">
      <div className="py-6 sm:py-8">
        <img className="h-11 w-auto sm:h-14" src={logoDark} alt="Movexa logo" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 pb-16 md:grid-cols-2 md:gap-16">
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-md border border-[#323236] bg-[#111113] py-1 pl-2 pr-2.5 font-mono text-[11.5px] tracking-wide text-[#a0a0a8]">
            <span className={`h-[7px] w-[7px] rounded-full ${isNotFound ? "bg-[#a0a0a8] shadow-[0_0_10px_#a0a0a8]" : "bg-red-500 shadow-[0_0_10px_#ef4444]"}`} />
            {isNotFound ? "404 · Page not found" : "Error · Something broke"}
          </span>

          <h1 className="mb-3.5 mt-5 text-4xl font-bold leading-[1.02] tracking-tight text-balance sm:text-5xl">
            {isNotFound ? "This scene didn't make the final cut." : "The reel jammed."}
          </h1>

          <p className="mb-7 max-w-[46ch] text-base text-[#a0a0a8]">
            {isNotFound
              ? "The page you're looking for doesn't exist or has moved. Check the address, or head back to browse what's playing."
              : "Something went wrong while loading this page. It's not you. Try again, and if it keeps happening, copy the details below."}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {isNotFound ? (
              <>
                <button
                  onClick={() => navigate("/browse")}
                  className="h-11 rounded-[10px] bg-[#ededef] px-[18px] text-sm font-medium text-[#0a0a0b] transition-opacity hover:opacity-90"
                >
                  Back to browse
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="h-11 rounded-[10px] border border-[#323236] bg-white/5 px-[18px] text-sm font-medium transition hover:border-[#4a4a50] hover:bg-white/10"
                >
                  Go back
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => window.location.reload()}
                  className="h-11 rounded-[10px] bg-[#ededef] px-[18px] text-sm font-medium text-[#0a0a0b] transition-opacity hover:opacity-90"
                >
                  Try again
                </button>
                <button
                  onClick={() => navigate("/browse")}
                  className="h-11 rounded-[10px] border border-[#323236] bg-white/5 px-[18px] text-sm font-medium transition hover:border-[#4a4a50] hover:bg-white/10"
                >
                  Go home
                </button>
              </>
            )}
          </div>

          {!isNotFound && errorDetails && (
            <details className="group mt-7 overflow-hidden rounded-xl border border-[#232326] bg-[#111113]">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-3.5 py-3 text-[13px] text-[#a0a0a8] [&::-webkit-details-marker]:hidden">
                <span className="text-[#6e6e76] transition-transform group-open:rotate-90">›</span>
                Technical details
              </summary>
              <pre className="m-0 whitespace-pre-wrap break-words border-t border-[#232326] px-3.5 py-3 font-mono text-xs leading-relaxed text-[#c9c9cf]">
                {errorDetails}
              </pre>
              <div className="flex justify-end px-2.5 pb-2.5">
                <button
                  onClick={handleCopy}
                  className="h-[30px] rounded-lg border border-[#323236] bg-white/5 px-[11px] text-[12.5px] font-medium transition hover:bg-white/10"
                >
                  Copy details
                </button>
              </div>
            </details>
          )}
        </div>

        <div className="order-first flex justify-center md:order-none" aria-hidden="true">
          {isNotFound ? (
            <div className="w-full max-w-[420px] -rotate-[4deg] rounded-md border border-[#323236] bg-[#0d0d0f] shadow-[0_30px_70px_rgb(0_0_0_/_0.6)]">
              <FilmHoles />
              <div className="grid grid-cols-3 gap-1.5 px-2">
                <div className="aspect-[4/5] rounded-[3px] bg-gradient-to-br from-[#1b2236] to-[#3b2a1a]" />
                <div className="relative grid aspect-[4/5] place-items-center rounded-[3px] border border-dashed border-[#3a3a40] bg-[repeating-linear-gradient(135deg,#0f0f12_0_8px,#121216_8px_16px)]">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10.5px] text-[#6e6e76]">
                    SCENE 404 · MISSING
                  </span>
                  <b className="font-mono text-2xl font-medium text-[#a0a0a8]">404</b>
                </div>
                <div className="aspect-[4/5] rounded-[3px] bg-gradient-to-br from-[#2b1b1b] to-[#13202b]" />
              </div>
              <FilmHoles />
            </div>
          ) : (
            <div className="relative aspect-[4/3] w-full max-w-[400px] overflow-hidden rounded-lg border border-[#323236] bg-gradient-to-b from-[#1b2236] to-[#3b2a1a] shadow-[0_30px_70px_rgb(0_0_0_/_0.6)]">
              <div className="absolute inset-x-[15%] bottom-0 h-[38%] bg-black/50" />
              <div className="absolute left-[56%] top-[44%] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[radial-gradient(circle,#fff0c8_0%,#ffaa3c_22%,rgb(200_60_20_/_0.6)_45%,transparent_70%)]" />
              <span className="absolute bottom-2.5 left-3 font-mono text-[11px] text-white/70">00:42:17:09</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilmHoles = () => (
  <div className="flex justify-around px-1.5 py-2">
    {Array.from({ length: 12 }).map((_, i) => (
      <span key={i} className="h-2.5 w-3.5 rounded-[2px] bg-[#08090b] shadow-[inset_0_0_0_1px_#2a2a2e]" />
    ))}
  </div>
);

export default Error;
