import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Termos e Condições</Text>
      <Text>Esta é a tela com os termos e condições do aplicativo.</Text>
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
