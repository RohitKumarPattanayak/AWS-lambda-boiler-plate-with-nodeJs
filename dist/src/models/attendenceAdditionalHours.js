"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const job_1 = __importDefault(require("./job"));
const employee_1 = __importDefault(require("./employee"));
class AttendenceAdditionalHours extends sequelize_1.Model {
    static associate(models) { }
}
AttendenceAdditionalHours.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    hours: {
        type: sequelize_1.DataTypes.STRING(8),
        allowNull: false
    },
    comments: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    modified_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    }
}, {
    modelName: 'AttendenceAdditionalHours',
    tableName: 'attendence_additional_hours',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
job_1.default.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
AttendenceAdditionalHours.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
AttendenceAdditionalHours.belongsTo(employee_1.default, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
AttendenceAdditionalHours.belongsTo(employee_1.default, {
    foreignKey: 'modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'employee_code',
    sourceKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
AttendenceAdditionalHours.belongsTo(employee_1.default, {
    foreignKey: 'employee_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = AttendenceAdditionalHours;
