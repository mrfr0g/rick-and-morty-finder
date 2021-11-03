import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useQuery } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { fetchCharacterDetail } from '../queries/fetchCharacterDetail.gql';

export default function TabTwoScreen({ route }: any) {
  const { params } = route;
  const { loading, error, data } = useQuery(fetchCharacterDetail(params.id));

  // TODO better than this
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('DATA', data);

  return (
    <View style={styles.container}>
      <Image
        style={styles.characterThumb}
        source={{ uri: data.character.image }}
      />
      <Text style={styles.title}>Name: {data.character.name}</Text>
      <Text style={styles.title}>Status: {data.character.status}</Text>
      <Text style={styles.title}>Gender: {data.character.gender}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  characterThumb: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginRight: 5,
  },
});
