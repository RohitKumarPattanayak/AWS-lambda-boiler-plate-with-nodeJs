"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class EquipmentMaster extends sequelize_1.Model {
    static associate(models) { }
}
EquipmentMaster.init({
    equipment_code: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    }
}, {
    modelName: 'EquipmentMaster',
    tableName: 'sap_equipment_master',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = EquipmentMaster;
