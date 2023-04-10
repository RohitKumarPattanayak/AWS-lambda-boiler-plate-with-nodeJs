"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const job_1 = __importDefault(require("./job"));
const employee_1 = __importDefault(require("./employee"));
class DailyReport extends sequelize_1.Model {
    static associate(models) {
        DailyReport.hasMany(models.Supervisor);
    }
}
DailyReport.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    last_report_submitted: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    submitted_by_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    session_start_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    session_end_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    modelName: 'DailyReport',
    tableName: 'daily_report',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
job_1.default.hasMany(DailyReport, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
DailyReport.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
//NEEDED ASSOCIATION:
employee_1.default.hasMany(DailyReport, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'submitted_by_employee_code'
});
DailyReport.belongsTo(employee_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'submitted_by_employee_code'
});
exports.default = DailyReport;
