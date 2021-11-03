import * as React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { useQuery } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { Loading } from '../components/Loading';
import { fetchCharacters } from '../queries/fetchCharacters.gql';

export default function CharacterListScreen({ navigation }: any) {
  const [filterValueBuffer, onChangeFilter] = React.useState('');
  const [filterValue, onChangeFilterValue] = React.useState('');

  let { loading, error, data } = useQuery(fetchCharacters(1, filterValue));

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({ item }: any) => (
    <Pressable
      onPress={() => {
        navigation.navigate('CharacterDetail', {
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
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filter}
          onChangeText={onChangeFilter}
          value={filterValueBuffer}
        />
        <Pressable
          onPress={() => {
            // Trigger search by copying state into the actual filter
            onChangeFilterValue(filterValueBuffer);
          }}
        >
          <View style={styles.filterButton}>
            <Text>Search</Text>
          </View>
        </Pressable>
      </View>
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
  filterContainer: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    height: 40,
    borderWidth: 1,
    width: '80%',
  },
  filterButton: {
    marginLeft: 10,
  },
});
