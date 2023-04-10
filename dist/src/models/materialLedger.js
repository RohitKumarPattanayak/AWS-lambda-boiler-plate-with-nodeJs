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
class MaterialLedger extends sequelize_1.Model {
}
MaterialLedger.init({
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
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    supervisor_emp_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('received', 'used', 'return'),
        allowNull: true
    },
    material_request_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    }
}, {
    modelName: 'MaterialLedger',
    tableName: 'material_ledger',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
employee_1.default.hasMany(MaterialLedger, {
    foreignKey: 'supervisor_emp_code',
    sourceKey: 'sap_employee_code'
});
MaterialLedger.belongsTo(employee_1.default, {
    foreignKey: 'supervisor_emp_code',
    targetKey: 'sap_employee_code'
});
job_1.default.hasMany(MaterialLedger, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code'
});
MaterialLedger.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code'
});
materialMaster_1.default.hasOne(MaterialLedger, {
    foreignKey: 'material_code',
    sourceKey: 'material_code'
});
MaterialLedger.belongsTo(materialMaster_1.default, {
    foreignKey: 'material_code',
    targetKey: 'material_code'
});
//UPCOMING: associations with materialRequest
// MaterialRequest.hasMany(MaterialLedger, {
//     foreignKey: 'material_request_id',
//     onDelete: 'cascade',
//     onUpdate: 'cascade'
// })
// MaterialLedger.belongsTo(MaterialRequest, { foreignKey: 'material_request_id', onDelete: 'cascade', onUpdate: 'cascade' })
exports.default = MaterialLedger;
