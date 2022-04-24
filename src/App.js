import { Box, useColorMode } from "@chakra-ui/react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import requests from "./tmdbRequests";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Tv from "./components/Tv";
import Horror from "./components/Horror";
import Movie from "./components/Movie";
import Search from "./components/Search";
import TvShow from "./components/TvShow";
import Show from "./components/Show";

function App() {
  // const API_KEY = "0100fd5106a322614a7c2f9577efea7b";
  const base_url = "https://api.themoviedb.org/3";
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [results, setResults] = useState([]);

  const tvPopular = `https://api.themoviedb.org/3/tv/popular?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US&page=1`;

  useEffect(() => {
    axios.get(`${base_url}${requests.fetchTrending.url}`).then((res) => {
      setResults(res.data.results);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar isDark={isDark} toggleColorMode={toggleColorMode} />
      <Box>
        <Routes>
          <Route
            path="/"
            exact
            element={<Main url={`${base_url}${requests.fetchTrending.url}`} />}
          />
          <Route
            path="/movies"
            element={
              <Movies url={`${base_url}${requests.fetchActionMovies.url}`} />
            }
          />
          <Route
            path="/tv"
            element={<Tv url={`${base_url}${requests.fetchTV.url}`} />}
          />
          <Route
            path="/horror"
            element={
              <Horror url={`${base_url}${requests.fetchHorrorMovies.url}`} />
            }
          />
          <Route
            path="/shows"
            element={<TvShow url={tvPopular} isDark={isDark} />}
          />

          <Route path="/movie/:movieId" element={<Movie isDark={isDark} />} />
          <Route path="/tv/:movieId" element={<Movie isDark={isDark} />} />
          <Route path="/shows/:showId" element={<Show isDark={isDark} />} />
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
