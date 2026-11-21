export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w200"

// Add a size and path, e.g. IMG_BASE_URL + "w1280" + backdrop_path
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/"