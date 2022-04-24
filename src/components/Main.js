import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Main = ({ url, isDark }) => {
  const [results, setResults] = useState([]);

  const fetchFunction = (someURL) => {
    axios.get(someURL).then((res) => {
      setResults(res.data.results);
    });
  };

  useEffect(() => {
    fetchFunction(url);
  }, []);

  if (results != null) {
    console.log(results);
  }

  const getDate = (currentDate) => {
    const myArray = currentDate.split("-");
    return myArray[0];
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={4}
      maxW="1400px"
      justifyContent="center"
      marginX={{ base: 0, md: 62, lg: 112, xl: 144 }}
      marginY={16}
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

export default Main;
