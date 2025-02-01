import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Importando o ícone de voltar

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Navegar para a tela anterior
      >
        <Ionicons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      {/* Título da página */}
      <Text style={styles.title}>Configurações</Text>
      <Text>Esta é a tela de configurações!</Text>

      {/* Opções de navegação */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('EditAccountScreen')} // Navegação para a tela de editar dados
      >
        <Text style={styles.optionText}>Editar dados da conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('TermsScreen')} // Navegação para a tela de termos e condições
      >
        <Text style={styles.optionText}>Termos e condições</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('ChatSupportScreen')} // Navegação para a tela de chat
      >
        <Text style={styles.optionText}>Chat para suporte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Para ajustar a posição do conteúdo para não sobrepor a barra de status
    paddingLeft: 10,
  },
  backButton: {
    position: 'absolute', // Para posicionar o botão no canto superior esquerdo
    top: 20, // Ajuste para alinhar com a barra de status
    left: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40, // Ajuste para a posição do título
    marginBottom: 20,
  },
  optionButton: {
    marginVertical: 15, // Espaço entre os textos
  },
  optionText: {
    fontSize: 18,
    color: '#41D4D4', // Cor do texto das opções
    fontWeight: 'bold',
  },
});
