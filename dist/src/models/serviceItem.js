"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const serviceCatalog_1 = __importDefault(require("./serviceCatalog"));
const materialMaster_1 = __importDefault(require("./materialMaster"));
const quoteLineItem_1 = __importDefault(require("./quoteLineItem"));
class ServiceItem extends sequelize_1.Model {
    static associate(models) { }
}
ServiceItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    service_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    material_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    qty: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: false
    }
}, {
    modelName: 'ServiceItem',
    tableName: 'service_item',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
serviceCatalog_1.default.hasMany(ServiceItem, {
    foreignKey: 'service_code',
    sourceKey: 'service_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
ServiceItem.belongsTo(serviceCatalog_1.default, {
    foreignKey: 'service_code',
    targetKey: 'service_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
materialMaster_1.default.hasMany(ServiceItem, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
ServiceItem.belongsTo(materialMaster_1.default, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
quoteLineItem_1.default.hasOne(ServiceItem, {
    foreignKey: 'material_code',
    sourceKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
ServiceItem.belongsTo(quoteLineItem_1.default, {
    foreignKey: 'material_code',
    targetKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = ServiceItem;
