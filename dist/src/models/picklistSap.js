"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const statusMaster_1 = __importDefault(require("./statusMaster"));
const job_1 = __importDefault(require("./job"));
const sapMenu_1 = __importDefault(require("./sapMenu"));
class PicklistSap extends sequelize_1.Model {
    static associate(models) { }
}
PicklistSap.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    menu_group_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    item_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    qty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    unit_descriptor: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    status_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    modelName: 'PicklistSap',
    tableName: 'picklist_sap',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
job_1.default.hasMany(PicklistSap, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
PicklistSap.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
PicklistSap.belongsTo(statusMaster_1.default, {
    foreignKey: 'status_code'
});
sapMenu_1.default.hasMany(PicklistSap, {
    foreignKey: 'menu_group_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
PicklistSap.belongsTo(sapMenu_1.default, {
    foreignKey: 'menu_group_code',
    targetKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = PicklistSap;
