import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatSupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat para Suporte</Text>
      <Text>Esta é a tela para o chat de suporte ao cliente.</Text>
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
