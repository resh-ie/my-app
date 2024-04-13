"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { CharacterCard } from "../ui/characterCard/characterCard";

const query = gql`
  query {
    characters {
      results {
        name
        image
        status
      }
    }
  }
`;

export default function PollPage() {
  const { data } = useSuspenseQuery(query);

  return (
    <div>
      {data?.characters?.results?.map((character: any) => (
        // <div key={character.name}>
        //   <img src={character.image} alt={character.name} />
        //   <p>{character.name}</p>
        // </div>
        <CharacterCard
          key={character.name}
          name={character.name}
          url={character.image}
          status={character.status}
        />
      ))}
    </div>
  );
}
