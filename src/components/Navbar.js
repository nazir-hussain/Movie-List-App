import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isDark, toggleColorMode }) => {
  const [search, setSearch] = useState("");

  let navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setSearch(e.target.value);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      navigate(`search/${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      bg={isDark ? "blackAlpha.600" : "green.50"}
      borderBottom={isDark ? "" : "1px solid black"}
      h={24}
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDir="row"
      padding={{ base: 4, md: 8, lg: 8, xl: 8 }}
      paddingX={{ base: 4, md: 8, lg: 8, xl: 8 }}
    >
      <Box
        display="flex"
        justifyContent="space-evenly"
        gap={{ base: 8, md: 8, lg: 12, xl: 12 }}
        alignItems="center"
      >
        <Link onClick={() => navigate("/")} _hover={{ border: "" }}>
          <Text fontSize={{ base: "md", md: "md", lg: "xl", xl: "2xl" }}>
            Movies app
          </Text>
        </Link>
        <Breadcrumb fontSize={{ base: "10px", md: "md", lg: "lg", xl: "lg" }}>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/")}>
              Trending
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/movies")}>
              Movies
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/shows")}>
              TV Shows
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/horror")}>
              Horror
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/tv")}>
              TV Movies
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box display="flex" alignItems="center" gap={[2, 4, 5, 6]}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Input
            placeholder="Search..."
            border="1px solid black"
            color={isDark ? "white" : "black"}
            onChange={(e) => handleChange(e)}
            fontSize={{ base: "10px", md: "lg", lg: "lg", xl: "lg" }}
          />
          <Button
            variant="outline"
            type="submit"
            fontSize={{ base: "10px", md: "md", lg: "lg", xl: "lg" }}
          >
            Search
          </Button>
        </form>
        <IconButton
          onClick={toggleColorMode}
          icon={isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
