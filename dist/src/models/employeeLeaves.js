"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const models_1 = require("../models");
class EmployeeLeaves extends sequelize_1.Model {
}
EmployeeLeaves.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
        // references: {
        //     model: Employee,
        //     key: 'sap_employee_code'
        // },
        // onDelete: 'cascade',
        // onUpdate: 'cascade'
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    leave_type: {
        type: sequelize_1.DataTypes.ENUM('leave', 'week off'),
        allowNull: false,
        defaultValue: 'leave'
    }
}, {
    modelName: 'EmployeeLeaves',
    tableName: 'employee_leaves',
    timestamps: true,
    indexes: [
        {
            name: 'tbl_employee_leaves_employee_code_date',
            unique: true,
            fields: ['employee_code', 'date']
        }
    ],
    comment: 'Table to track employee leaves',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
models_1.Employee.hasMany(EmployeeLeaves, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
EmployeeLeaves.belongsTo(models_1.Employee, {
    foreignKey: 'employee_code'
});
exports.default = EmployeeLeaves;
