import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieDetails = (movieId) => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                // One request for details, cast, videos and recommendations
                const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos,recommendations`, API_OPTIONS);
                if (!data.ok) throw new Error("TMDB error " + data.status);
                const jsonData = await data.json();
                setResult({ id: movieId, movie: jsonData });
            } catch (error) {
                console.error("Movie details failed:", error);
                setResult({ id: movieId, error });
            }
        };

        getMovieDetails();
    }, [movieId]);

    // While a new movie loads, don't return the previous movie's data
    return result?.id === movieId ? result : {};
};

export default useMovieDetails;
