import axios from 'axios';

// URL do seu backend
const API_URL = 'http://localhost:3000/veterinarians'; // Substitua conforme necessário

// Função para registrar um novo veterinário
export const registrarVeterinario = async (veterinarioData: any) => {
  try {
    const response = await axios.post(API_URL, veterinarioData);
    return response.data; // Retorna a resposta do backend
  } catch (error: unknown) {
    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      throw new Error('Erro ao registrar veterinário: ' + error.message);
    } else {
      throw new Error('Erro desconhecido ao registrar veterinário');
    }
  }
};
