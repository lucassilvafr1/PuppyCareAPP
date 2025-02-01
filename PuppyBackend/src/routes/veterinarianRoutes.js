const express = require('express');
const bcrypt = require('bcryptjs');
const Veterinarian = require('../models/Veterinarian');
const router = express.Router();

router.post('/register', async (req, res) => {
  console.log("Requisição recebida:", req.body); // Verifica se a requisição chegou

  try {
    // Desestruturando os campos
    const { fullNameOrCompany, cnpj, crmv, cep, address, email, phone, password, confirmPassword } = req.body;

    // Verificando se todos os campos obrigatórios estão presentes
    const requiredFields = ['fullNameOrCompany', 'cnpj', 'crmv', 'cep', 'address', 'email', 'phone', 'password', 'confirmPassword'];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        console.log(`Campo ausente: ${field}`); // Log para verificar qual campo está faltando
        return res.status(400).json({ error: `O campo ${field} é obrigatório.` });
      }
    }

    // Verificando se as senhas são iguais
    if (password !== confirmPassword) {
      console.log("Senhas não coincidem!");
      return res.status(400).json({ error: 'As senhas não coincidem!' });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criando o veterinário no banco de dados
    const veterinarian = await Veterinarian.create({
      fullNameOrCompany,
      cnpj,
      crmv,
      cep,
      address,
      email,
      phone,
      password: hashedPassword,
    });

    console.log("Veterinário registrado com sucesso:", veterinarian);
    res.status(201).json(veterinarian);

  } catch (error) {
    console.error("Erro ao registrar veterinário:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
