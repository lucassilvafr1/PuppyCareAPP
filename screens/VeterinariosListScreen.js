import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

// Dados dos veterinários (mesmo que na tela principal)
const veterinarios = [
  { id: '1', name: 'Veterinária ABC', address: 'R. Portugal, 41 - Bangu, Santo André - SP, 09280-660', rating: 4.5, animalId: '1' },
  { id: '2', name: 'Dr. Hato - Clínica Veterinária e Pet Shop', address: 'Av. Martim Francisco, 102 - Santo André - SP, 09220-750', rating: 4.8, animalId: '2' },
  { id: '3', name: 'Au Mada Pet Shop e Clínica Veterinária', address: 'R. Amazonas, 380 - Jardim, Santo André - SP, 09040-420', rating: 4.3, animalId: '3' },
  { id: '4', name: 'Mexericão Clínica Veterinária', address: 'R. Padre Álvares Cabral, 895, Santo André - SP, 09260-760', rating: 4.7, animalId: '4' },
];

const VeterinariosList = ({ route }) => {
  const { animalId } = route.params; // Recebe o animalId da tela anterior

  // Filtra os veterinários com base no animalId
  const filteredVeterinarios = veterinarios.filter(vet => vet.animalId === animalId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veterinários para seu {animalId}</Text>
      <FlatList
        data={filteredVeterinarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vetItem}>
            <Text style={styles.vetName}>{item.name}</Text>
            <Text style={styles.vetAddress}>{item.address}</Text>
            <Text style={styles.vetRating}>⭐ {item.rating.toFixed(1)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vetItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
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
});

export default VeterinariosList;
