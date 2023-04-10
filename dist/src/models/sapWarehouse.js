"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class SapWarehouse extends sequelize_1.Model {
    static associate(models) { }
}
SapWarehouse.init({
    sap_warehouse_code: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    sap_warehouse_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    modelName: 'SapWarehouse',
    tableName: 'sap_warehouse',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = SapWarehouse;
