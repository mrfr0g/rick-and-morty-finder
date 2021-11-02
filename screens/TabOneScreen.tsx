import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  // Testing query
  React.useEffect(() => {
    client
      .query({
        query: gql`
          query {
            characters(page: 2, filter: { name: "rick" }) {
              info {
                count
              }
              results {
                name
              }
            }
            location(id: 1) {
              id
            }
            episodesByIds(ids: [1, 2]) {
              id
            }
          }
        `,
      })
      .then((result) => console.log(result));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
