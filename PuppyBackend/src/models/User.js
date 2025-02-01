import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import bcrypt from 'bcrypt'; // Importando bcrypt para hash de senha

const User = sequelize.define('User', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
}, {
    hooks: {
        beforeCreate: async (user, options) => {
            // Validação de confirmação de senha
            if (user._passwordConfirmation && user.password !== user._passwordConfirmation) {
                throw new Error("Passwords do not match");
            }

            // Gerando o hash da senha
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
});

// Campo virtual para senha de confirmação
User.prototype.setPasswordConfirmation = function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
};

export default User;
