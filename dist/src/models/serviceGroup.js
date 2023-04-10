"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class ServiceGroup extends sequelize_1.Model {
    static associate(models) { }
}
ServiceGroup.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    service_group_code: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    modelName: 'ServiceGroup',
    tableName: 'service_group',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
exports.default = ServiceGroup;
