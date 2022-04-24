import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const Search = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((res) => {
        setResults(res.data.results);
      });
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={4}
      marginY={12}
      maxW="1400px"
      justifyContent="center"
      marginX={{ base: 0, md: 62, lg: 112, xl: 144 }}
    >
      {results != null
        ? results.map((item) => (
            <Card
              title={item.media_type === "movie" ? item.title : item.name}
              imageURL={item.poster_path}
              year={item.release_date}
              id={item.id}
              href={
                item.media_type === "movie"
                  ? `/movie/${item.id}`
                  : `/shows/${item.id}`
              }
            />
          ))
        : ""}
    </Box>
  );
};

export default Search;
