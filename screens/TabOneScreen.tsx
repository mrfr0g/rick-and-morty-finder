import * as React from 'react';
import { StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { Loading } from '../components/Loading';
import { fetchCharacters } from '../queries/fetchCharacters.gql';

export default function TabOneScreen({ navigation }: any) {
  const { loading, error, data } = useQuery(fetchCharacters(1));

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        navigation.navigate('TabTwo', {
          id: item.id,
        });
      }}
    >
      <View style={styles.characterListContainer}>
        <Image style={styles.characterThumb} source={{ uri: item.image }} />
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );

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
