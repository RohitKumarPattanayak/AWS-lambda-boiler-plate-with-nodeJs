"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class CustomerType extends sequelize_1.Model {
}
CustomerType.init({
    code: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    modelName: 'CustomerType',
    tableName: 'customer_type`',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = CustomerType;
