import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/nowMoviesSlice";

const useMovieTrailer = (movieId)=>{

    const dispatch = useDispatch();

        const getMovieVideo = async ()=>{
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
            if (!data.ok) throw new Error("TMDB error " + data.status);
            const jsonData = await data.json();

            const results = jsonData.results || [];
            const filterData = results.filter(video=> video.type === "Trailer")
            const trailer = filterData.length ? filterData[0] : results[0]
            dispatch(addTrailerVideo(trailer));
        } catch (error) {
            console.error("Trailer failed:", error);
        }
    };

    useEffect(()=>{
        getMovieVideo();
    },[])
}

export default useMovieTrailer