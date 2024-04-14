"use client";
import { gql } from "@apollo/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Box, Heading, Text, Image, Divider } from "@chakra-ui/react";

export const GET_CHARACTER_BY_ID = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      created
    }
  }
`;

const CharacterPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data, error } = useSuspenseQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });
  console.log("data", data);

  if (error) return <p>Error: {error.message}</p>;

  const character = data?.character;

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
