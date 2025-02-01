import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import bcrypt from 'bcrypt';  // Importando o bcrypt para o hash da senha

const Veterinarian = sequelize.define('Veterinarian', {
    fullNameOrBusinessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    crmv: {
        type: DataTypes.STRING,
        allowNull: true, // CRMV é opcional, caso seja um parceiro
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordConfirmation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Hash de senha (sem validação de senha no modelo)
Veterinarian.beforeCreate(async (veterinarian, options) => {
    // Gerando o hash da senha
    const salt = await bcrypt.genSalt(10);
    veterinarian.password = await bcrypt.hash(veterinarian.password, salt);

    // Removendo a senha de confirmação antes de salvar
    veterinarian.passwordConfirmation = undefined;

    return veterinarian;
});

export default Veterinarian;
