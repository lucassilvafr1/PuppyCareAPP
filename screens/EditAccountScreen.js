import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditAccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Dados da Conta</Text>
      <Text>Esta é a tela para editar os dados da conta.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
