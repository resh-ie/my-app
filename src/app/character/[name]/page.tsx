"use client";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Box, Heading, Text, Image, Divider } from "@chakra-ui/react";

export const GET_CHARACTER = gql`
  query Character($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;

const CharacterPage = () => {
  const { data, error } = useSuspenseQuery(GET_CHARACTER, {
    variables: { name },
  });

  if (error) return <p>Error: {error.message}</p>;

  const character = data?.characters?.results[0];

  return (
    <Box maxW="container.md" mt="8" mx="auto">
      {character && (
        <>
          <Heading mb="4">{character.name}</Heading>
          <Image src={character.image} alt={character.name} />
          <Divider my="4" />
          <Text>
            Status: {character.status}
            <br />
            Species: {character.species}
            <br />
            Type: {character.type}
            <br />
            Gender: {character.gender}
          </Text>
        </>
      )}
    </Box>
  );
};

export default CharacterPage;
