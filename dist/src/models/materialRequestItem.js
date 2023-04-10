"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const materialRequest_1 = __importDefault(require("./materialRequest"));
const materialMaster_1 = __importDefault(require("./materialMaster"));
class MaterialRequestItem extends sequelize_1.Model {
    static associate(models) { }
}
MaterialRequestItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    request_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    material_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    requested_qty: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: true
    },
    approved_qty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    rejected_qty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    delivered_qty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    modelName: 'MaterialRequestItem',
    tableName: 'material_request_item',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
materialMaster_1.default.hasMany(MaterialRequestItem, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialRequestItem.belongsTo(materialMaster_1.default, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
materialRequest_1.default.hasMany(MaterialRequestItem, {
    foreignKey: 'request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialRequestItem.belongsTo(materialRequest_1.default, {
    foreignKey: 'request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = MaterialRequestItem;
