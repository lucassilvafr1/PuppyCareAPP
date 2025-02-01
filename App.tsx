import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import TermsScreen from './screens/TermsScreen';
import ChatSupportScreen from './screens/ChatSupportScreen';
import VeterinariosListScreen from './screens/VeterinariosListScreen';
import LoginScreen from './screens/LoginScreen'; // Importa a nova página de login
import RegisterScreen from './screens/RegisterScreen'; // Nova tela de registro
import RegisterDetailsScreen from './screens/RegisterDetailsScreen'; // Nova tela de detalhes do registro

// Defina os tipos para as rotas
type RootStackParamList = {
  Login: undefined;
  Register: undefined; // Rota para a tela de registro
  RegisterDetails: undefined; // Rota para a tela de detalhes do registro
  Home: undefined;
  Settings: undefined;
  EditAccount: undefined;
  Terms: undefined;
  ChatSupport: undefined;
  VeterinariosList: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen} // Tela de registro
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterDetails"
          component={RegisterDetailsScreen} // Tela de detalhes do registro
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatSupport"
          component={ChatSupportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VeterinariosList"
          component={VeterinariosListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
