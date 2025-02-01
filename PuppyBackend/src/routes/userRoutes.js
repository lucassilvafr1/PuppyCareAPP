const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    // Recebendo os dados do corpo da requisição
    const { fullName, birthDate, cpf, cep, address, email, phone, password, confirmPassword } = req.body;

    // Validação de senhas
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem!' });
    }

    // Validação de campos obrigatórios
    const requiredFields = ['fullName', 'birthDate', 'cpf', 'cep', 'address', 'email', 'phone', 'password', 'confirmPassword'];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `O campo ${field} é obrigatório.` });
      }
    }

    // Validando CPF (somente números, no formato correto)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      return res.status(400).json({ error: 'CPF inválido.' });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criando o usuário no banco de dados
    const user = await User.create({
      fullName,
      birthDate,
      cpf,
      cep,
      address,
      email,
      phone,
      password: hashedPassword,
    });

    // Respondendo com o usuário criado
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao tentar registrar o usuário.' });
  }
});

module.exports = router;
