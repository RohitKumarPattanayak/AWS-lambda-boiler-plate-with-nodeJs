"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const sapMenu_1 = __importDefault(require("./sapMenu"));
const cateringRequest_1 = __importDefault(require("./cateringRequest"));
class CateringMenu extends sequelize_1.Model {
    static associate(models) { }
}
CateringMenu.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    catering_request_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    sap_menu_code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    pax: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    }
}, {
    modelName: 'CateringMenu',
    tableName: 'catering_menu',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
cateringRequest_1.default.hasMany(CateringMenu, {
    foreignKey: 'catering_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
CateringMenu.belongsTo(cateringRequest_1.default, {
    foreignKey: 'catering_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
sapMenu_1.default.hasMany(CateringMenu, {
    foreignKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
CateringMenu.belongsTo(sapMenu_1.default, {
    foreignKey: 'sap_menu_code',
    targetKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = CateringMenu;
