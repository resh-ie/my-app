"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "../ui/characterCard/characterCard";

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

export default function Information() {
  const { data } = useSuspenseQuery(query);

  return (
    <div>
      {data?.characters?.results?.map((character: any) => (
        <CharacterCard
          key={character.name}
          name={character.name}
          url={character.image}
          status={character.status}
          id={character.id}
        />
      ))}
    </div>
  );
}
