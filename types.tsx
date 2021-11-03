declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  CharacterList: undefined;
  CharacterDetail: {
    id: string;
  };
};
