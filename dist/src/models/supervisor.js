"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const models_1 = require("../models");
class Supervisor extends sequelize_1.Model {
}
Supervisor.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: models_1.Job,
            key: 'sap_job_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    },
    upload_essential: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
}, {
    modelName: 'Supervisor',
    tableName: 'supervisor',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
models_1.Job.hasOne(Supervisor, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code'
});
Supervisor.belongsTo(models_1.Job, {
    onDelete: 'cascade',
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    hooks: true
});
models_1.Employee.hasOne(Supervisor, {
    foreignKey: 'employee_code',
    sourceKey: 'sap_employee_code'
});
Supervisor.belongsTo(models_1.Employee, {
    foreignKey: 'employee_code'
});
exports.default = Supervisor;
