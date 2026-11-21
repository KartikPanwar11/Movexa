import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiSearch } from "../utils/aiSlice";
import logoDark from "../assets/logo/movexa-dark.png";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showAiSearch = useSelector((store) => store.ai.showAiSearch);

  // Browse should show the movie rows, so close AI search if it's open
  const handleBrowseClick = () => {
    if (showAiSearch) dispatch(toggleAiSearch());
  };

  const handleAskAiClick = () => {
    if (!showAiSearch) dispatch(toggleAiSearch());
    navigate("/browse");
    window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t border-[#1f1f23] px-6 pb-7 pt-9 sm:px-10 lg:px-14">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <Link to="/browse" onClick={handleBrowseClick} className="flex items-center gap-3">
          <img className="h-9 w-auto" src={logoDark} alt="Movexa home" />
          <span className="text-[13.5px] text-[#a0a0a8]">Discover what to watch</span>
        </Link>

        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-[13.5px] text-[#a0a0a8]">
          <Link to="/browse" onClick={handleBrowseClick} className="transition hover:text-white">
            Browse
          </Link>
          <button type="button" onClick={handleAskAiClick} className="transition hover:text-white">
            Ask AI
          </button>
          <a
            href="https://github.com/KartikPanwar11/Movexa"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>

      <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-[#1f1f23] pt-5 text-[12.5px] text-[#6e6e76] sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Movexa · Built by Kartik Panwar</span>

        <div className="flex max-w-[520px] items-center gap-3">
          {/* shortcut: text badge, swap for the official TMDB logo SVG before shipping */}
          <span className="shrink-0 rounded-[5px] border border-[#2a2a2e] px-[7px] py-[3px] text-[11.5px] font-bold tracking-[0.08em] text-[#a0a0a8]">
            TMDB
          </span>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
