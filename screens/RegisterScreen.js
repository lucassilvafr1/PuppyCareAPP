import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { axiosInstance } from '../utils/axiosConfig'; // Importando a instância do Axios

const RegisterScreen = ({ navigation }) => {
  const [role, setRole] = useState(null); // 'user' ou 'veterinarian'
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    cpf: '',
    cnpj: '', // Somente se for veterinário
    crmv: '', // Somente se for veterinário
    tradeName: '', // Nome fantasia (somente veterinário)
    establishmentResponsible: '', // Nome do responsável (somente veterinário)
    cep: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    // Verificar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }

    // Verificar se todos os campos obrigatórios estão preenchidos
    const requiredFields = ['name', 'birthDate', 'cpf', 'cep', 'address', 'email', 'phone', 'password', 'confirmPassword'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        Alert.alert('Erro', `O campo ${field} é obrigatório.`);
        return false;
      }
    }

    // Veterinário: Verificar campos específicos
    if (role === 'veterinarian') {
      const vetFields = ['tradeName', 'establishmentResponsible', 'cnpj', 'crmv'];
      for (let field of vetFields) {
        if (!formData[field]) {
          Alert.alert('Erro', `O campo ${field} é obrigatório para veterinário.`);
          return false;
        }
      }
    }

    // Validação do email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      Alert.alert('Erro', 'Email inválido.');
      return false;
    }

    // Validação do telefone
    const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phonePattern.test(formData.phone)) {
      Alert.alert('Erro', 'Telefone inválido.');
      return false;
    }

    // Validação de senha (mínimo de 8 caracteres)
    if (formData.password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    // Definir a URL de acordo com o tipo de usuário
    const url = role === 'veterinarian' ? '/veterinario' : '/usuario';

    try {
      // Preparando os dados do formulário para enviar ao backend
      const dataToSend = {
        ...formData,
        role: role, // Passando o tipo de usuário
      };

      // Enviar para o backend usando Axios
      const response = await axiosInstance.post(url, dataToSend);

      if (response.status === 201) {
        Alert.alert('Registro bem-sucedido', 'Conta criada com sucesso!');
        navigation.navigate('Login'); // Redirecionar para a tela de login
      } else {
        Alert.alert('Falha no registro', 'Ocorreu um erro ao criar a conta.');
      }
    } catch (error) {
      console.error('Erro no registro:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {/* Escolha do tipo de usuário (Veterinário ou Usuário) */}
      {!role && (
        <View style={styles.roleSelection}>
          <Button title="Sou Veterinário" onPress={() => setRole('veterinarian')} />
          <Button title="Sou Usuário" onPress={() => setRole('user')} />
        </View>
      )}

      {/* Formulário de Registro */}
      {role && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Nascimento"
            value={formData.birthDate}
            onChangeText={(text) => handleInputChange('birthDate', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={formData.cpf}
            onChangeText={(text) => handleInputChange('cpf', text)}
            keyboardType="numeric"
            maxLength={14} // Definindo limite de caracteres para o CPF
            disabled={role === 'veterinarian'} // Desabilitar campo se for veterinário
          />

          {/* Campos específicos para Veterinário */}
          {role === 'veterinarian' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nome Fantasia"
                value={formData.tradeName}
                onChangeText={(text) => handleInputChange('tradeName', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Nome do Responsável"
                value={formData.establishmentResponsible}
                onChangeText={(text) => handleInputChange('establishmentResponsible', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CNPJ"
                value={formData.cnpj}
                onChangeText={(text) => handleInputChange('cnpj', text)}
                keyboardType="numeric"
                maxLength={18} // Definindo limite de caracteres para o CNPJ
              />
              <TextInput
                style={styles.input}
                placeholder="CRMV"
                value={formData.crmv}
                onChangeText={(text) => handleInputChange('crmv', text)}
              />
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={formData.cep}
            onChangeText={(text) => handleInputChange('cep', text)}
            keyboardType="numeric"
            maxLength={9} // Limite para o CEP
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
            maxLength={15} // Limite para o telefone com máscara
          />
          <TextInput
            style={styles.input}
            placeholder="Senha de Acesso"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmação da Senha"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />

          <Button title="Cadastrar" onPress={handleRegister} />
        </View>
      )}
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
  roleSelection: {
    marginBottom: 20,
  },
  form: {
    marginTop: 20,
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

export default RegisterScreen;
