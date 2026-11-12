import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/nowMoviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlaying = async()=>{
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
            if (!data.ok) throw new Error("TMDB error " + data.status);
            const jsonData = await data.json();
            dispatch(addNowPlayingMovies(jsonData.results))
        } catch (error) {
            console.error("Now playing movies failed:", error);
        }
  }

    useEffect(()=>{
        getNowPlaying();
    },[])
}

export default useNowPlayingMovies;
