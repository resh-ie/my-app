"use client";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Stack, Text, Button } from "@chakra-ui/react";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "./ui/characterCard/characterCard";

const CHARACTERS_PER_PAGE = 10; // Number of characters per page

const query = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
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
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSuspenseQuery(query, {
    variables: { page: currentPage },
  });
  const characters = data?.characters?.results || [];
  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

  const paginatedCharacters = characters.slice(
    (currentPage - 1) * CHARACTERS_PER_PAGE,
    currentPage * CHARACTERS_PER_PAGE
  );

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
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
      <Text textAlign="center" mb={4}>
        Page {currentPage} of {totalPages}
      </Text>
      {/* Characters */}
      {paginatedCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          url={character.image}
          status={character.status}
          id={character.id}
        />
      ))}
    </div>
  );
}
