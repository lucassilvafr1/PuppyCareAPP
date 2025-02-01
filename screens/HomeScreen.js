import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importando os arquivos PNG
import DogPng from '../assets/Buttons/Cachorro.png';
import CatPng from '../assets/Buttons/Gato.png';
import BirdPng from '../assets/Buttons/Aves.png';
import RodentPng from '../assets/Buttons/Roedor.png';
import ExoticPng from '../assets/Buttons/Exoticos.png';
import FishPng from '../assets/Buttons/Peixe.png';
import ReptilePng from '../assets/Buttons/Reptil.png';

// Dados dos veterinários
const veterinarios = [
  { id: '1', name: 'Veterinária ABC', address: 'R. Portugal, 41 - Bangu, Santo André - SP, 09280-660', rating: 4.5 },
  { id: '2', name: 'Dr. Hato - Clínica Veterinária e Pet Shop', address: 'Av. Martim Francisco, 102 - Santo André - SP, 09220-750', rating: 4.8 },
  { id: '3', name: 'Au Mada Pet Shop e Clínica Veterinária', address: 'R. Amazonas, 380 - Jardim, Santo André - SP, 09040-420', rating: 4.3 },
  { id: '4', name: 'Mexericão Clínica Veterinária', address: 'R. Padre Álvares Cabral, 895, Santo André - SP, 09260-760', rating: 4.7 },
];

// Dados dos animais
const animais = [
  { id: '1', name: 'Cachorro', png: DogPng },
  { id: '2', name: 'Gato', png: CatPng },
  { id: '3', name: 'Pássaro', png: BirdPng },
  { id: '4', name: 'Roedor', png: RodentPng },
  { id: '5', name: 'Exótico', png: ExoticPng },
  { id: '6', name: 'Peixe', png: FishPng },
  { id: '7', name: 'Réptil', png: ReptilePng },
];

const HomeScreen = ({ navigation }) => {
  // Handle para selecionar o animal e navegar para a tela de veterinários
  const handleAnimalSelection = (animal) => {
    navigation.navigate('VeterinariosList', { animalId: animal.id });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#41D4D4" />

      {/* Botão de Configurações */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Setting')}
      >
        <Icon name="settings-outline" size={40} color="#000" />
      </TouchableOpacity>

      {/* Círculos Decorativos */}
      <View style={styles.decorativeCircles}>
        <View style={styles.largeCircle} />
        <View style={styles.smallCircle} />
      </View>

      {/* Texto de Boas-Vindas */}
      <Text style={styles.welcomeText}>Seja bem-vindo</Text>

      {/* Barra de Pesquisa */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#aaa"
        />
        <Icon name="search-outline" size={20} color="#000" style={styles.searchIcon} />
      </View>

      {/* ScrollView para o conteúdo que deve rolar */}
      <ScrollView style={styles.scrollViewContainer}>
        {/* Carrossel de Animais */}
        <FlatList
          data={animais}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.animalContainer}
              onPress={() => handleAnimalSelection(item)}
            >
              <View style={styles.animalCircle}>
                <Image source={item.png} style={{ width: 125, height: 125 }} />
              </View>
              <Text style={styles.animalText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Lista de Veterinários */}
        <Text style={styles.sectionTitle}>Encontre seu veterinário mais próximo:</Text>
        <FlatList
          data={veterinarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.vetItem}>
              <Text style={styles.vetName}>{item.name}</Text>
              <Text style={styles.vetAddress}>{item.address}</Text>
              <Text style={styles.vetRating}>⭐ {item.rating.toFixed(1)}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Meu Aplicativo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  decorativeCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  largeCircle: {
    width: 350,
    height: 350,
    borderRadius: 1000,
    backgroundColor: '#41D4D4',
    position: 'absolute',
    top: -80,
    left: -100,
  },
  smallCircle: {
    width: 350,
    height: 350,
    borderRadius: 1000,
    backgroundColor: '#5DE4E4',
    position: 'absolute',
    top: -140,
    left: 60,
  },
  settingsButton: {
    position: 'absolute',
    top: 33,
    right: 16,
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 43,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    borderWidth: 2,
    borderColor: '#41D4D4',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#41D4D4',
  },
  searchIcon: {
    marginLeft: 8,
  },
  animalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 130,
  },
  animalCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#41D4D4',
  },
  animalText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 8,
    color: '#000',
  },
  vetItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  vetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  vetAddress: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  vetRating: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  scrollViewContainer: {
    flexGrow: 1,  // Garante que o ScrollView ocupe todo o espaço
  },
});

export default HomeScreen;
