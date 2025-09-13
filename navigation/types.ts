export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    SubjectSelection: undefined;
    Questions: { topic: string };
  };
  
  // Declare global namespace for useNavigation hook
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }