"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const job_1 = __importDefault(require("./job"));
const employee_1 = __importDefault(require("./employee"));
class CateringRequest extends sequelize_1.Model {
    static associate(models) { }
}
CateringRequest.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('internal', 'external'),
        allowNull: false
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    requested_by_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    created_by: {
        type: sequelize_1.DataTypes.ENUM('sap', 'mobile'),
        allowNull: false
    }
}, {
    modelName: 'CateringRequest',
    tableName: 'catering_request',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
job_1.default.hasMany(CateringRequest, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
CateringRequest.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(CateringRequest, {
    foreignKey: 'requested_by_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
CateringRequest.belongsTo(employee_1.default, {
    foreignKey: 'requested_by_employee_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = CateringRequest;
