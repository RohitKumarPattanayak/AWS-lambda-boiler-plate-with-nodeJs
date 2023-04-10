"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class DivisionMaster extends sequelize_1.Model {
}
DivisionMaster.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    division_code: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    icon_filename: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
        defaultValue: 'default.png'
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    is_catering: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
}, {
    modelName: 'DivisionMaster',
    tableName: 'division_master',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = DivisionMaster;
