"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class StatusMaster extends sequelize_1.Model {
    static associate(models) {
        StatusMaster.hasMany(models.Job);
    }
}
StatusMaster.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    desc: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    status_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('job', 'quote', 'materialrequest', 'catering_pickup', 'task'),
        allowNull: false
    }
}, {
    modelName: 'StatusMaster',
    tableName: 'status_master',
    timestamps: true,
    comment: ' site details ',
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = StatusMaster;
