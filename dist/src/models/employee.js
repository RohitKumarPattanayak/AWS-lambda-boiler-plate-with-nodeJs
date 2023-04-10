"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const models_1 = require("../models");
class Employee extends sequelize_1.Model {
}
Employee.init({
    sap_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    role_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: models_1.Role,
            key: 'role_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    photo_url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    last_login_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    fcm: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    has_app_access: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    daily_contract_hrs: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 8
    },
    emp_type: {
        type: sequelize_1.DataTypes.ENUM('omani', 'expat', 'women'),
        allowNull: false,
        defaultValue: 'omani'
    },
    key: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    sex: {
        type: sequelize_1.DataTypes.ENUM('male', 'female', 'transgender'),
        allowNull: true
    },
    country: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    }
}, {
    modelName: 'Employee',
    tableName: 'employee',
    timestamps: true,
    comment: 'This contains employees data',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
Employee.belongsTo(models_1.Role, {
    onDelete: 'cascade',
    foreignKey: 'role_code',
    hooks: true
});
exports.default = Employee;
