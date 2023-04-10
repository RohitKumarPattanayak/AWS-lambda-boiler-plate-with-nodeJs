"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const employee_1 = __importDefault(require("./employee"));
const materialRequest_1 = __importDefault(require("./materialRequest"));
class MaterialRequestAction extends sequelize_1.Model {
    static associate(models) { }
}
MaterialRequestAction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    material_request_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    action: {
        type: sequelize_1.DataTypes.ENUM('approved', 'rejected', 'delivered'),
        allowNull: false
    },
    action_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    action_role: {
        type: sequelize_1.DataTypes.ENUM('warehouse', 'dm', 'me'),
        allowNull: true
    },
    quantity: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    modelName: 'MaterialRequestAction',
    tableName: 'material_request_action',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
employee_1.default.hasMany(MaterialRequestAction, {
    foreignKey: 'action_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialRequestAction.belongsTo(employee_1.default, {
    foreignKey: 'action_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
materialRequest_1.default.hasMany(MaterialRequestAction, {
    foreignKey: 'material_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialRequestAction.belongsTo(materialRequest_1.default, {
    foreignKey: 'material_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = MaterialRequestAction;
