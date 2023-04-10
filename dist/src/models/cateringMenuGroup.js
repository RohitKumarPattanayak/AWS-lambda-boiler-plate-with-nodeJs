"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const sapMenu_1 = __importDefault(require("./sapMenu"));
class CateringMenuGroup extends sequelize_1.Model {
    static associate(models) { }
}
CateringMenuGroup.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    menu_group_code: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    sap_menu_code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    }
}, {
    modelName: 'CateringMenuGroup',
    tableName: 'catering_menu_group',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            name: 'menu_group_indexed_code',
            fields: ['menu_group_code']
        }
    ],
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
sapMenu_1.default.hasMany(CateringMenuGroup, {
    foreignKey: 'sap_menu_code',
    sourceKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
CateringMenuGroup.belongsTo(sapMenu_1.default, {
    foreignKey: 'sap_menu_code',
    targetKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = CateringMenuGroup;
