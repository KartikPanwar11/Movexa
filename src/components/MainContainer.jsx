import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle";
import VideoBg from "./VideoBg";


const MainContainer = () => {

    const movies = useSelector((store=> store.movies?.nowPlayingMovies));

    if (movies === null) return;
 
    const mainMovie = movies[0];
    // console.log(mainMovie);

    const {original_title, overview, id } = mainMovie;

  return (
    <div className="relative isolate min-h-[min(86vh,58rem)] overflow-hidden bg-zinc-950">
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBg movieId={id}/>

    </div>
  )
}

export default MainContainer
