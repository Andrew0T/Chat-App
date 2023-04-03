// import Start screen from './components/Start'
import Start from './components/Start';
// import Chat screen from './components/Chat'
import Chat from './components/Chat';

// import the screens we want to navigate
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
  
const Stack = createNativeStackNavigator();

// The app’s main Chat component that renders the chat UI
const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
