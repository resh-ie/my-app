import { gql } from "@apollo/client";

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  created: string;
}

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

export interface GetCharacterByIdResponse {
  character: Character;
}
