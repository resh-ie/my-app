"use client";

export const dynamic = "force-dynamic";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const query = gql`
  query {
    characters {
      results {
        name
        image
      }
    }
  }
`;

export default function PollPage() {
  const { data } = useSuspenseQuery(query);

  return (
    <div>
      {data?.characters?.results?.map((character: any) => (
        <div key={character.name}>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
}
