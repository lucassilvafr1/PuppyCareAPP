import axios from 'axios';

// Criação de uma instância do Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Substitua com o URL do seu backend
  timeout: 5000,  // Aumenta o timeout para 5 segundos
});

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro de rede:', error);
    if (error.response) {
      console.error('Erro de resposta:', error.response.data);
    } else if (error.request) {
      console.error('Erro de requisição:', error.request);
    } else {
      console.error('Erro inesperado:', error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
