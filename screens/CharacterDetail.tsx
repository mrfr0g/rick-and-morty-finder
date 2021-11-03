import * as React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { Loading } from '../components/Loading';
import { fetchCharacterDetail } from '../queries/fetchCharacterDetail.gql';

const StatLabel = ({ label, value }: any) => {
  return (
    <Text style={styles.title}>
      {label}: {value}
    </Text>
  );
};

const GoBackButton = ({ onPress = () => {} }: any) => {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Text style={styles.goBackButton}>&larr; Back to list</Text>
      </View>
    </Pressable>
  );
};

export default function TabTwoScreen({ navigation, route }: any) {
  const { params } = route;
  const { loading, error, data } = useQuery(fetchCharacterDetail(params.id));

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.characterThumb}
        source={{ uri: data.character.image }}
      />
      <StatLabel label="Name" value={data.character.name} />
      <StatLabel label="Status" value={data.character.status} />
      <StatLabel label="Gender" value={data.character.gender} />
      <GoBackButton
        onPress={() => {
          navigation.navigate('CharacterList');
        }}
      />
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
    marginTop: 50,
    marginRight: 5,
    borderRadius: 100,
  },
  goBackButton: {
    alignSelf: 'flex-end',
    fontSize: 18,
    marginRight: 10,
  },
});
