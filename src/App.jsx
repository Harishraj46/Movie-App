import React, { useState, useEffect } from "react";
import Search from "./component/Search";
import Spinner from "./component/spinner";
import Moviecard from "./component/Moviecard";
import useDebounce from "./hooks/useDebounce";
import {
  getTrendingMovies,
  updateSearchCount,
} from "./Firebase/firebaseService";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_MOVIEAPI_KEY;
const API = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [search, setsearch] = useState("");
  const [errormsg, seterrormsg] = useState("");
  const [movielist, setmovielist] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [trendingmovies, settrendingmovies] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  const fetchmovie = async (query = "") => {
    try {
      setisloading(true);
      seterrormsg("");

      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API);

      if (!response.ok) {
        throw new Error("failed to fetch movies");
      }

      const data = await response.json();

      if (data.response === "false") {
        seterrormsg(data.Error || "failed to fetch movies");
        setmovielist([]);
        return;
      }
   
      setmovielist(data.results || []);

      if (query && data.results?.[0]) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching Movies:${error}`);
      seterrormsg("Error fetching movie. Please try again later");
    } finally {
      setisloading(false);
    }
  };

  const loadtrendingmovies = async () => {
    try {
      const movies = await getTrendingMovies();

      settrendingmovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies:${error}`);
    }
  };

  useEffect(() => {
    fetchmovie(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    loadtrendingmovies();
  }, []);

  return (
    <>
      <main>
        <div className="pattern">
          <div className="wrapper">
            <header>
              <img src="/hero-img.png" alt="Hero img" />
              <h1>
                Discover <span className="text-gradient">films</span> that fit
                your vibe
              </h1>
            </header>

            <Search search={search} setsearch={setsearch} />

            {trendingmovies.length > 0 && (
              <section className="trending">

              <h2>Most Popular Movies</h2>
                <ul>
                  {trendingmovies.map((movie, index) => (
                    <li key={movie.id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="all-movies">
              <h2>Movies</h2>
              {isloading ? (
                <Spinner />
              ) : errormsg ? (
                <p className="text-white">{errormsg}</p>
              ) : (
                <ul>
                  {movielist.map((movie) => (
                    <Moviecard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
