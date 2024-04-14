import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
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

export interface Character {
  id: string;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
}

export interface CharactersQueryResponse {
  characters: {
    results: Character[];
  };
}
