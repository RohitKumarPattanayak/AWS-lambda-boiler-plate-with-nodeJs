"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const quote_1 = __importDefault(require("./quote"));
const initiationChecklist_1 = __importDefault(require("./initiationChecklist"));
class QuoteInitChecklist extends sequelize_1.Model {
    static associate(models) { }
}
QuoteInitChecklist.init({
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
    checklist_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true
    }
}, {
    modelName: 'QuoteInitChecklist',
    tableName: 'quote_init_checklist',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
quote_1.default.hasMany(QuoteInitChecklist, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteInitChecklist.belongsTo(quote_1.default, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
initiationChecklist_1.default.hasMany(QuoteInitChecklist, {
    foreignKey: 'checklist_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteInitChecklist.belongsTo(initiationChecklist_1.default, {
    foreignKey: 'checklist_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = QuoteInitChecklist;
