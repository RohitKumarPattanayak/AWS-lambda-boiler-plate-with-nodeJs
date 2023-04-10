"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const quote_1 = __importDefault(require("./quote"));
const employee_1 = __importDefault(require("./employee"));
class QuoteLog extends sequelize_1.Model {
    static associate(models) { }
}
QuoteLog.init({
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
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    supervisor_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    old_quote_obj: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    new_quote_obj: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    modelName: 'QuoteLog',
    tableName: 'quote_log',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
quote_1.default.hasMany(QuoteLog, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteLog.belongsTo(quote_1.default, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(QuoteLog, {
    foreignKey: 'supervisor_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteLog.belongsTo(employee_1.default, {
    foreignKey: 'supervisor_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = QuoteLog;
