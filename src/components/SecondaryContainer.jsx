import { useSelector } from "react-redux";
import MovieLists from "./MovieLists";


const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies)


  return (
    <div className="relative z-10 -mt-20 sm:-mt-28 bg-gradient-to-b from-transparent via-[#08090b] via-25% to-[#08090b] pt-16 sm:pt-20 pb-16">
      <div className="space-y-6 sm:space-y-8">
        <MovieLists title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieLists title={"Popular"} movies={movies.popularMovies}/>
        <MovieLists title={"Top Rated"} movies={movies.topRatedMovies}/>
        <MovieLists title={"Upcomming"} movies={movies.upcommingMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer
