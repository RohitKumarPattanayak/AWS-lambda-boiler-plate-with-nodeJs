"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const serviceCatalog_1 = __importDefault(require("./serviceCatalog"));
class InitiationCheckList extends sequelize_1.Model {
    static associate(models) { }
}
InitiationCheckList.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    checklist: {
        type: sequelize_1.DataTypes.STRING(100)
    }
}, {
    modelName: 'InitiationCheckList',
    tableName: 'initialion_checklist',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
serviceCatalog_1.default.hasMany(InitiationCheckList, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
InitiationCheckList.belongsTo(serviceCatalog_1.default, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = InitiationCheckList;
