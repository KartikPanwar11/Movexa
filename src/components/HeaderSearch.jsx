import { useEffect, useRef, useState } from "react";

// Search icon in the header that opens into a text field.
// UI only: the search itself is still to be written (see the TODO below).
const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const openSearch = () => {
    setIsOpen(true);
    inputRef.current.focus();
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    inputRef.current.blur();
  };

  const handleIconClick = () => {
    if (isOpen && query === "") closeSearch();
    else openSearch();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    // TODO: search for movies with e.target.value
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeSearch();
  };

  useEffect(() => {
    // "/" opens the search from anywhere, unless you're already typing in a field
    const handleShortcut = (e) => {
      const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current.focus();
      }
    };

    // Clicking outside collapses the box, but only when nothing is typed
    const handleClickOutside = (e) => {
      if (wrapperRef.current.contains(e.target)) return;
      if (inputRef.current.value === "") setIsOpen(false);
    };

    document.addEventListener("keydown", handleShortcut);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={`flex h-9 items-center gap-2 overflow-hidden rounded-full border px-[10px] backdrop-blur-xl transition-[width,background-color,border-color] duration-300 ease-[cubic-bezier(.3,.8,.3,1)] sm:h-10 sm:px-[11px] ${
          isOpen
            ? "w-[min(320px,calc(100vw-220px))] border-[#323236] bg-[#141416]/90"
            : "w-9 border-white/35 bg-white/15 hover:border-white/60 hover:bg-white/25 sm:w-10"
        }`}
      >
        <button
          type="button"
          onClick={handleIconClick}
          aria-label={isOpen ? "Close search" : "Search movies"}
          aria-expanded={isOpen}
          className="grid shrink-0 place-items-center text-white"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          tabIndex={isOpen ? 0 : -1}
          placeholder="Search by title"
          aria-label="Search by title"
          className={`min-w-0 flex-1 bg-transparent text-sm text-[#ededef] outline-none transition-opacity duration-200 placeholder:text-[#6e6e76] ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {isOpen && query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current.focus();
            }}
            aria-label="Clear search"
            className="shrink-0 text-sm text-[#6e6e76] transition hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderSearch;
