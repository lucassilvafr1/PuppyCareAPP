const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const veterinarianRoutes = require('./routes/veterinarianRoutes'); // Ou o nome correto

// Middleware
app.use(bodyParser.json()); // Para poder ler o corpo JSON nas requisições

// Defina a rota
app.use('/veterinarian', veterinarianRoutes); // Certifique-se de que o caminho está correto

// Porta onde o servidor estará escutando
app.listen(8080, () => {
  console.log('Servidor rodando em http://localhost:3000');
  app.use((req, res, next) => {
    console.log('Requisição recebida:', req.method, req.url);  // Adiciona esse log para ver se a requisição está chegando
    next();
  });
  
});
