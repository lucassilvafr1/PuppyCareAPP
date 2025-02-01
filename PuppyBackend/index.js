import express from 'express';
import sequelize from './src/models/index.js';  // Instância do Sequelize
import User from './src/models/User.js';  // Modelo de Usuário
import Veterinarian from './src/models/Veterinarian.js';  // Modelo de Veterinário
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Testando a conexão e sincronizando o banco de dados
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized!');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

// --- Usuários CRUD ---

// Rota POST para criar um usuário
app.post('/users', async (req, res) => {
    try {
        const { fullName, email, password, passwordConfirmation, phone, address, birthDate, cpf, cep } = req.body;

        // Verificando se todos os campos obrigatórios foram enviados
        if (!fullName || !email || !password || !passwordConfirmation || !phone || !address || !birthDate || !cpf || !cep) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Validando se as senhas coincidem
        if (password !== passwordConfirmation) {
            return res.status(400).json({ message: "As senhas não coincidem." });
        }

        // Criando o novo usuário no banco de dados
        const user = await User.create({
            fullName,
            email,
            password,  // Não incluindo passwordConfirmation
            phone,
            address,
            birthDate,
            cpf,
            cep
        });

        // Retornando o usuário criado
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
});

// Rota GET para listar todos os usuários
app.get('/users', async (req, res) => {
    try {
        // Buscando todos os usuários no banco de dados
        const users = await User.findAll();

        // Retornando a lista de usuários
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
    }
});

// Rota PUT para atualizar um usuário
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, password, phone, address, birthDate, cpf, cep } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.password = password || user.password;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.birthDate = birthDate || user.birthDate;
        user.cpf = cpf || user.cpf;
        user.cep = cep || user.cep;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
});

// Rota DELETE para excluir um usuário
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await user.destroy();
        res.status(200).json({ message: "Usuário excluído com sucesso." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Erro ao excluir o usuário", error: error.message });
    }
});

// --- Veterinários CRUD ---

// Rota POST para criar um veterinário
app.post('/veterinarians', async (req, res) => {
    try {
        const { fullNameOrBusinessName, email, password, passwordConfirmation, phone, address, cnpj, cep, crmv } = req.body;

        // Verificando se todos os campos obrigatórios foram enviados
        if (!fullNameOrBusinessName || !email || !password || !phone || !address || !cnpj || !cep) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Validando se as senhas coincidem
        if (password !== passwordConfirmation) {
            return res.status(400).json({ message: "As senhas não coincidem." });
        }

        // Criando o novo veterinário no banco de dados
        const veterinarian = await Veterinarian.create({
            fullNameOrBusinessName,
            email,
            password,  // Não incluindo passwordConfirmation
            phone,
            address,
            cnpj,
            cep,
            crmv,
        });

        // Retornando o veterinário criado
        res.status(201).json(veterinarian);
    } catch (error) {
        console.error("Error creating veterinarian:", error);
        res.status(500).json({ message: "Erro ao criar o veterinário", error: error.message });
    }
});

// Rota GET para listar todos os veterinários
app.get('/veterinarians', async (req, res) => {
    try {
        // Buscando todos os veterinários no banco de dados
        const veterinarians = await Veterinarian.findAll();

        // Retornando a lista de veterinários
        res.status(200).json(veterinarians);
    } catch (error) {
        console.error("Error fetching veterinarians:", error);
        res.status(500).json({ message: "Erro ao buscar veterinários", error: error.message });
    }
});

// Rota PUT para atualizar um veterinário
app.put('/veterinarians/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { fullNameOrBusinessName, email, password, phone, address, cnpj, cep, crmv } = req.body;

        const veterinarian = await Veterinarian.findByPk(id);
        if (!veterinarian) {
            return res.status(404).json({ message: "Veterinário não encontrado." });
        }

        veterinarian.fullNameOrBusinessName = fullNameOrBusinessName || veterinarian.fullNameOrBusinessName;
        veterinarian.email = email || veterinarian.email;
        veterinarian.password = password || veterinarian.password;
        veterinarian.phone = phone || veterinarian.phone;
        veterinarian.address = address || veterinarian.address;
        veterinarian.cnpj = cnpj || veterinarian.cnpj;
        veterinarian.cep = cep || veterinarian.cep;
        veterinarian.crmv = crmv || veterinarian.crmv;

        await veterinarian.save();
        res.status(200).json(veterinarian);
    } catch (error) {
        console.error("Error updating veterinarian:", error);
        res.status(500).json({ message: "Erro ao atualizar o veterinário", error: error.message });
    }
});

// Rota DELETE para excluir um veterinário
app.delete('/veterinarians/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const veterinarian = await Veterinarian.findByPk(id);
        if (!veterinarian) {
            return res.status(404).json({ message: "Veterinário não encontrado." });
        }

        await veterinarian.destroy();
        res.status(200).json({ message: "Veterinário excluído com sucesso." });
    } catch (error) {
        console.error("Error deleting veterinarian:", error);
        res.status(500).json({ message: "Erro ao excluir o veterinário", error: error.message });
    }
});

// Rota GET (opcional) para testar o funcionamento do servidor
app.get('/', (req, res) => {
    res.send('Servidor está funcionando corretamente!');
});

export default app;
