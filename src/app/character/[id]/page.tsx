"use client";
import { gql } from "@apollo/client";
import { usePathname } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Box, Heading, Text, Image, Divider, Stack } from "@chakra-ui/react";
import { GET_CHARACTER_BY_ID, GetCharacterByIdResponse } from "@/gql/queries/getCharacterById";

const CharacterPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data, error } = useSuspenseQuery<GetCharacterByIdResponse>(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

  if (error) return <p>Error: {error.message}</p>;

  const character = data?.character;

  return (
    <Box maxW="container.md" mt="8" mx="auto">
      {character && (
        <>
          <Heading as="h1" mb="4" size="xl">
            {character.name}
          </Heading>
          <Image src={character.image} alt={character.name} mb="4" />
          <Divider my="4" />
          <Stack spacing={3}>
            <Text>
              Status: {character.status} <br />
              Species: {character.species} <br />
              Gender: {character.gender}
            </Text>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CharacterPage;
