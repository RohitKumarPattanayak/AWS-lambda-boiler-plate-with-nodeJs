"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class SapMenu extends sequelize_1.Model {
    static associate(models) { }
}
SapMenu.init({
    sap_menu_code: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    sap_menu_desc: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    sap_menu_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: true
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    modelName: 'SapMenu',
    tableName: 'sap_menu',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = SapMenu;
