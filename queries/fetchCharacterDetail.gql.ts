import { gql } from '@apollo/client';

export const fetchCharacterDetail = (id: string) => gql`
  query {
    character(id: ${id}) {
      id,
      name,
      image,
      status,
      gender
    }
  }`;
