"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class SapContract extends sequelize_1.Model {
    static associate(models) { }
}
SapContract.init({
    contract_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    project_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        defaultValue: 0
    }
}, {
    modelName: 'SapContract',
    tableName: 'sap_contract',
    timestamps: true,
    comment: ' site details ',
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = SapContract;
