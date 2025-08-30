import { CommonActions, StackActions } from '@react-navigation/native';

let navigation: any;

function setTopLevelNavigator(navigatorRef: any) {
  navigation = navigatorRef;
}

function navigate(name: string, params: any) {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

const navigateToClearStack = (state: string) => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: state }],
      }),
    );
  }
};

const navigateToClearStackDetail = (name: string, params: any) => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [
          { name: 'Dashboard' },
          { name: 'Home' },
          {
            name: name,
            params,
          },
        ],
      }),
    );
  }
};

const popFromStack = (count: number) => {
  const popAction = StackActions.pop(count);
  if (navigation) {
    navigation?.dispatch(popAction);
  }
};

const pushToStack = (name: string, params: any) => {
  if (navigation) {
    navigation?.dispatch(StackActions.push(name, params));
  }
};

function goBack() {
  if (navigation) {
    navigation?.dispatch(CommonActions.goBack());
  }
}

export default {
  navigate,
  setTopLevelNavigator,
  navigateToClearStack,
  goBack,
  popFromStack,
  pushToStack,
  navigateToClearStackDetail,
};
