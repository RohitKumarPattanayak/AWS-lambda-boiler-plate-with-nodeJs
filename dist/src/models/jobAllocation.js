"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const models_1 = require("../models");
class JobAllocation extends sequelize_1.Model {
}
JobAllocation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    temp_alloted: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    temp_start_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    temp_end_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    modelName: 'JobAllocation',
    tableName: 'job_allocation',
    timestamps: true,
    indexes: [
        {
            name: 'job_employee_code',
            unique: true,
            fields: ['job_code', 'employee_code']
        }
    ],
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
models_1.Employee.hasOne(JobAllocation, {
    foreignKey: 'employee_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
JobAllocation.belongsTo(models_1.Employee, {
    foreignKey: 'employee_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
models_1.Job.hasMany(JobAllocation, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
JobAllocation.belongsTo(models_1.Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
exports.default = JobAllocation;
