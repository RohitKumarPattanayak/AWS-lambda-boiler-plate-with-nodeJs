"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class PublicHolidays extends sequelize_1.Model {
    static associate(models) { }
}
PublicHolidays.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    modelName: 'PublicHolidays',
    tableName: 'public_holidays',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = PublicHolidays;
