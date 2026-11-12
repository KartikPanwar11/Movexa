import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/nowMoviesSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const getTopRatedMovies = async()=>{
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
            if (!data.ok) throw new Error("TMDB error " + data.status);
            const jsonData = await data.json();
            dispatch(addTopRatedMovies(jsonData.results))
        } catch (error) {
            console.error("Top rated movies failed:", error);
        }
  }

    useEffect(()=>{
        getTopRatedMovies();
    },[])
}

export default useTopRatedMovies;
