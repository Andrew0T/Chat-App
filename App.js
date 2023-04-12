// Import Start and Chat screens
import Start from "./components/Start";
import Chat from './components/Chat';

// Import react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
  
// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_PQA7VsKpsPVirhdR5AeGbcT3AXG1haQ",
  authDomain: "chat-app-53b10.firebaseapp.com",
  projectId: "chat-app-53b10",
  storageBucket: "chat-app-53b10.appspot.com",
  messagingSenderId: "45353717021",
  appId: "1:45353717021:web:1d6cecf678b597cec0e5f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
        >
          {
          props => <Chat db={db}{...props} />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
