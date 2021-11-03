import * as React from 'react';
import { StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { fetchCharacters } from '../queries/fetchCharacters.gql';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const { loading, error, data } = useQuery(fetchCharacters(1));

  // TODO better than this
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        navigation.replace('Root', {
          screen: 'TabTwo',
          params: {
            id: 'foo',
          },
        });
      }}
    >
      <View style={styles.characterListContainer}>
        <Image style={styles.characterThumb} source={{ uri: item.image }} />
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );

  console.log(data?.characters?.results[0]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.characters?.results || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: 10,
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
  characterListContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  characterThumb: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
});
