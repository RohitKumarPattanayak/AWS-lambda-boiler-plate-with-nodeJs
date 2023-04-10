"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const employee_1 = __importDefault(require("./employee"));
const materialMaster_1 = __importDefault(require("./materialMaster"));
class EmpMaterialBin extends sequelize_1.Model {
}
EmpMaterialBin.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    material_code: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    current_qty: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2).UNSIGNED,
        allowNull: false
    }
}, {
    modelName: 'EmpMaterialBin',
    tableName: 'emp_material_bin',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
employee_1.default.hasOne(EmpMaterialBin, {
    foreignKey: 'employee_code',
    sourceKey: 'sap_employee_code'
});
EmpMaterialBin.belongsTo(employee_1.default, {
    foreignKey: 'employee_code',
    targetKey: 'sap_employee_code'
});
materialMaster_1.default.hasOne(EmpMaterialBin, {
    foreignKey: 'material_code',
    sourceKey: 'material_code'
});
EmpMaterialBin.belongsTo(materialMaster_1.default, {
    foreignKey: 'material_code',
    targetKey: 'material_code'
});
exports.default = EmpMaterialBin;
