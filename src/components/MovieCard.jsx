import { IMG_CDN_URL } from "../utils/constants";


const MovieCard = ({posterPath}) => {
  if (!posterPath) return null;

  return (
    <div className="group shrink-0 overflow-hidden rounded-md bg-zinc-900 shadow-lg transition duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl">
      <img src={IMG_CDN_URL + posterPath} 
      className="block transition duration-300 group-hover:brightness-110"
      alt="Movies Posters"/>
    </div>
  )
}

export default MovieCard
