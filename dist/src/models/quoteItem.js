"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const quote_1 = __importDefault(require("./quote"));
const serviceCatalog_1 = __importDefault(require("./serviceCatalog"));
class QuoteItem extends sequelize_1.Model {
    static associate(models) { }
}
QuoteItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    quote_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    qty: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: true
    },
    service_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    service_desc: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: false
    }
}, {
    modelName: 'QuoteItem',
    tableName: 'quote_item',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    indexes: [
        {
            name: 'quote_service_id',
            unique: true,
            fields: ['service_id', 'quote_id']
        }
    ],
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
quote_1.default.hasMany(QuoteItem, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteItem.belongsTo(quote_1.default, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
serviceCatalog_1.default.hasMany(QuoteItem, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteItem.belongsTo(serviceCatalog_1.default, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = QuoteItem;
