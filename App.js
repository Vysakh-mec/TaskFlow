import "react-native-gesture-handler"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {

  const Stack = createStackNavigator()

  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}  />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}


