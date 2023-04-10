"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class ServiceCategory extends sequelize_1.Model {
    static associate(models) { }
}
ServiceCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    category_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    display_position: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    parent_category_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    modelName: 'ServiceCategory',
    tableName: 'service_category',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = ServiceCategory;
