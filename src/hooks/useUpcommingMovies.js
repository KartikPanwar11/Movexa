import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcommingMovies } from "../utils/nowMoviesSlice";

const useUpcommingMovies = () => {
    const dispatch = useDispatch();

    const getUpcommingMovies = async()=>{
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
            if (!data.ok) throw new Error("TMDB error " + data.status);
            const jsonData = await data.json();
            dispatch(addUpcommingMovies(jsonData.results))
        } catch (error) {
            console.error("Upcoming movies failed:", error);
        }
  }

    useEffect(()=>{
        getUpcommingMovies();
    },[])
}

export default useUpcommingMovies;
