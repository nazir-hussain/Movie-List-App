import { Box, Image, Text } from "@chakra-ui/react";
//import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import Movie from "./Movie";

const Card = ({ title, imageURL, year, description, duration, id, href }) => {
  let imagePath = `https://image.tmdb.org/t/p/w500`;
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      gap={2}
      _hover={{
        transform: "scale(1.1)",
        border: "1px solid white",
        transition: "all 300ms ease-in",
        zIndex: 2,
        cursor: "pointer",
      }}
      as="a"
      onClick={handleClick}
      maxW={{ base: 200, md: 180, lg: 200, xl: 200 }}
    >
      <Image src={`${imagePath}${imageURL}`} w={200} h={300} />
      <Box>
        <Text>{title}</Text>
      </Box>
    </Box>
  );
};

export default Card;
