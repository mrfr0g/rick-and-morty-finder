import { gql } from '@apollo/client';

export const fetchCharacters = (page: number, nameFilter = '') => gql`
  query {
    characters(page: ${page}, filter: { name: "${nameFilter}" }) {
      info {
        count
      }
      results {
        id,
        name,
        image
      }
    }
  }`;
