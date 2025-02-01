import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Adicionando axios para fazer requisições HTTP
import { registrarUsuarioAPI } from '../service/UsuarioService'; // Importando serviço atualizado
import { registrarVeterinarioAPI } from '../service/veterinarioService'; // Importando serviço atualizado

const RegisterDetailsScreen = ({ route, navigation }) => {
  // Estado do formulário
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [crmv, setCrmv] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Verifica o tipo de registro
  const { userType } = route.params; // 'user' ou 'veterinarian'

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    // Montando os dados para envio
    const data = {
      nomeCompleto: name,
      dataNascimento: birthDate,  // Certifique-se de que 'birthDate' está no formato correto
      cpf,
      cep,
      endereco: address,
      email,
      telefone: phone,
      senha: password,
      version: 1,  // Adicionando o campo 'version' para controle de versão
    };

    if (userType === 'veterinarian') {
      // Adicionando campos específicos para veterinário
      data.crmv = crmv;  // Manter somente o 'crmv'
    }

    try {
      // Enviar os dados dependendo do tipo de usuário
      if (userType === 'user') {
        await registrarUsuarioAPI(data); // Chama a API para registrar usuário
        Alert.alert('Cadastro realizado com sucesso!', 'Bem-vindo!');
      } else if (userType === 'veterinarian') {
        await registrarVeterinarioAPI(data); // Chama a API para registrar veterinário
        Alert.alert('Cadastro de Veterinário realizado com sucesso!', 'Bem-vindo!');
      }

      // Navegar para a tela de Login após o cadastro
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Campos comuns para Usuário e Veterinário */}
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmação da Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Campos adicionais caso seja Veterinário */}
      {userType === 'veterinarian' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="CRMV"
            value={crmv}
            onChangeText={setCrmv}
          />
        </>
      )}

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default RegisterDetailsScreen;
