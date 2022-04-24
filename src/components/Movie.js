import { Box, Button, Image, Link, Tag, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import SimilarCard from "./SimilarCard";

const Movie = ({ isDark }) => {
  const { movieId } = useParams();
  const [movieResults, setMovieResults] = useState({});
  const [similarResults, setSimilarResults] = useState([]);
  const similarURL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US&page=1`;
  const movieSearchURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US`;
  const imagePath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    axios.get(movieSearchURL).then((res) => {
      setMovieResults(res.data);
    });
    axios.get(similarURL).then((res) => {
      setSimilarResults(res.data.results);
    });
  }, []);

  return (
    <Box
      display="flex"
      justifyContent={{
        base: "center",
        md: "",
        lg: "",
        xl: "",
      }}
      flexDir="column"
      gap={{
        base: "1000px",
        md: "350px",
        lg: "30px",
        xl: "30px",
      }}
    >
      {movieResults != null ? (
        <Box
          bgImage={{
            base: "",
            md: `url(${imagePath}${movieResults.backdrop_path})`,
            lg: `url(${imagePath}${movieResults.backdrop_path})`,
            xl: `url(${imagePath}${movieResults.backdrop_path})`,
          }}
          h={{ base: "300px", md: "500px", lg: "1000px", xl: "1000px" }}
          w={{ base: "300px", md: "80%", lg: "100%", xl: "100%" }}
          rounded="5px"
          p={{ base: 8, md: 20, lg: 24, xl: 24 }}
          display="flex"
          justifyContent="center"
          minW="sm"
        >
          <Box
            display="flex"
            gap={{ base: "", md: 8, lg: 12, xl: 12 }}
            background={isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.45)"}
            boxShadow="2xl"
            p={{ base: 8, md: 20, lg: 24, xl: 24 }}
            transition="300ms"
            flexDir={{ base: "column", md: "row", lg: "row", xl: "row" }}
            minW="sm"
          >
            <Image
              src={`${imagePath}${movieResults.poster_path}`}
              h={{ base: 300, md: 400, lg: 500, xl: 500 }}
              w={{ base: 200, md: 500, lg: 600, xl: 600 }}
              marginTop={12}
            />
            <Box
              display="flex"
              flexDir="column"
              gap={{ base: 4, md: 6, lg: 8, xl: 8 }}
              marginTop={12}
            >
              <Text
                fontSize={{ base: "lg", md: "2xl", lg: "4xl", xl: "4xl" }}
                color={
                  isDark
                    ? { base: "white", md: "white", lg: "white", xl: "white" }
                    : { base: "black", md: "black", lg: "white", xl: "white" }
                }
                fontWeight="bold"
              >
                {movieResults.original_title}
              </Text>
              <Text
                fontSize={{ base: "md", md: "xl", lg: "2xl", xl: "2xl" }}
                color={
                  isDark
                    ? { base: "white", md: "white", lg: "white", xl: "white" }
                    : { base: "black", md: "black", lg: "white", xl: "white" }
                }
              >
                {movieResults.overview}
              </Text>
              <Box
                display="flex"
                gap={4}
                height={30}
                width={500}
                alignItems="center"
              >
                {movieResults.genres != null
                  ? movieResults.genres.map((item) => (
                      <Tag
                        bgColor={isDark ? "default" : "gray.900"}
                        transition="300ms"
                        color="white"
                        p={{ base: 2, md: 3, lg: 4, xl: 4 }}
                      >
                        {item.name}
                      </Tag>
                    ))
                  : ""}
              </Box>
              <Box display="flex" gap={4} flexDir="column">
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "2xl" }}
                  color={
                    isDark
                      ? { base: "white", md: "white", lg: "white", xl: "white" }
                      : { base: "black", md: "black", lg: "white", xl: "white" }
                  }
                >
                  Tagline: "{movieResults.tagline}"
                </Text>
                <Button
                  onClick={() =>
                    window.open(
                      `https://www.imdb.com/title/${movieResults.imdb_id}`,
                      "_blank"
                    )
                  }
                  variant="ghost"
                  w={120}
                  color={
                    isDark
                      ? { base: "white", md: "white", lg: "white", xl: "white" }
                      : { base: "black", md: "black", lg: "white", xl: "white" }
                  }
                  border="2px solid teal"
                >
                  IMDb Link
                </Button>
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "2xl" }}
                  fontWeight="bold"
                  transition="300ms"
                  color="white"
                >
                  {movieResults.release_date}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box
        marginX={{ base: "100px", md: "100px", lg: "300px", xl: "300px" }}
        display="flex"
        justifyContent="center"
        flexDir="column"
        gap={4}
      >
        <Text
          textAlign="center"
          fontSize={{ base: "xl", md: "xl", lg: "2xl", xl: "3xl" }}
        >
          Similar Movies:{" "}
        </Text>
        <Box display="flex" flexWrap="wrap" gap={4}>
          {similarResults != null
            ? similarResults.map((item) => (
                <SimilarCard
                  title={item.title}
                  imageURL={item.poster_path}
                  year={item.release_date}
                  id={item.id}
                  href={`/movie/${item.id}`}
                />
              ))
            : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default Movie;
