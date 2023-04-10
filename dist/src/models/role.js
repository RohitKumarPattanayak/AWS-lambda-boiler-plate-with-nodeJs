"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class Role extends sequelize_1.Model {
    static associate(models) {
        Role.hasOne(models.Employee);
    }
}
Role.init({
    role_code: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    staff_type: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'Role',
    tableName: 'role',
    timestamps: true,
    comment: ' site supervisor \n site manager \n divison manager ',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = Role;
