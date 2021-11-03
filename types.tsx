declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  TabOne: undefined;
  TabTwo: {
    id: string;
  };
};
