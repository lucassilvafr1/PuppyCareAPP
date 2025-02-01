/**
 * @format
 */

import { AppRegistry } from 'react-native';  // Importa o registro do componente
import App from './App.tsx';  // Importa o componente principal do seu app
import { name as appName } from './app.json';  // Importa o nome do seu app

// Registra o componente principal do app com o nome definido em 'app.json'
AppRegistry.registerComponent(appName, () => App);
