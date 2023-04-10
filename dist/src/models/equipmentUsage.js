"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const employee_1 = __importDefault(require("./employee"));
const job_1 = __importDefault(require("./job"));
const materialMaster_1 = __importDefault(require("./materialMaster"));
class EquipmentUsage extends sequelize_1.Model {
}
EquipmentUsage.init({
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
    material_code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    supervisor_emp_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    hrs: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '00'
    },
    mins: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: '00'
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    modelName: 'EquipmentUsage',
    tableName: 'equipment_usage',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
employee_1.default.hasMany(EquipmentUsage, {
    foreignKey: 'supervisor_emp_code',
    sourceKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
EquipmentUsage.belongsTo(employee_1.default, {
    foreignKey: 'supervisor_emp_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
job_1.default.hasMany(EquipmentUsage, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
EquipmentUsage.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
materialMaster_1.default.hasMany(EquipmentUsage, {
    foreignKey: 'material_code',
    sourceKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
EquipmentUsage.belongsTo(materialMaster_1.default, {
    foreignKey: 'material_code',
    targetKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = EquipmentUsage;
