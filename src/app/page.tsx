"use client";
import { useState } from "react";
import { Stack, Text, Button } from "@chakra-ui/react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "./ui/characterCard/characterCard";

const CHARACTERS_PER_PAGE = 10; // Number of characters per page

const query = gql`
  query {
    characters {
      results {
        id
        name
        image
        status
      }
    }
  }
`;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSuspenseQuery(query);
  const characters = data?.characters?.results || [];
  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedCharacters = characters.slice(
    (currentPage - 1) * CHARACTERS_PER_PAGE,
    currentPage * CHARACTERS_PER_PAGE
  );

  return (
    <div>
      {/* Pagination Controls */}
      <Stack direction="row" spacing={4} justify="center" mt={4} mb={2}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            colorScheme={currentPage === i + 1 ? "teal" : "gray"}
          >
            {i + 1}
          </Button>
        ))}
      </Stack>
      {/* Characters */}
      {paginatedCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          url={character.image}
          status={character.status}
        />
      ))}
    </div>
  );
}
