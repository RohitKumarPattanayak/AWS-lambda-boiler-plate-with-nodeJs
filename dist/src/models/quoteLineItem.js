"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const materialMaster_1 = __importDefault(require("./materialMaster"));
const quoteItem_1 = __importDefault(require("./quoteItem"));
class QuoteLineItem extends sequelize_1.Model {
    static associate(models) { }
}
QuoteLineItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    quote_item_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    material_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    qty: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2).UNSIGNED,
        allowNull: true
    },
    unit_descriptor: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: true
    }
}, {
    modelName: 'QuoteLineItem',
    tableName: 'quote_line_item',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
quoteItem_1.default.hasMany(QuoteLineItem, {
    foreignKey: 'quote_item_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteLineItem.belongsTo(quoteItem_1.default, {
    foreignKey: 'quote_item_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
materialMaster_1.default.hasMany(QuoteLineItem, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteLineItem.belongsTo(materialMaster_1.default, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = QuoteLineItem;
