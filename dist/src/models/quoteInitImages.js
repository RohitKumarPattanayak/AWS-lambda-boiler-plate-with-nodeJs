"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const quote_1 = __importDefault(require("./quote"));
class QuoteInitImages extends sequelize_1.Model {
    static associate(models) { }
}
QuoteInitImages.init({
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
    image_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('init', 'approve'),
        allowNull: false,
        defaultValue: 'init'
    }
}, {
    modelName: 'QuoteInitImages',
    tableName: 'quote_images',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
quote_1.default.hasMany(QuoteInitImages, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
QuoteInitImages.belongsTo(quote_1.default, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = QuoteInitImages;
