"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const sapSite_1 = __importDefault(require("./sapSite"));
class SapLocation extends sequelize_1.Model {
    static associate(models) {
        SapLocation.hasMany(models.Job);
    }
}
SapLocation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    site_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    latitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    },
    longitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    }
}, {
    modelName: 'SapLocation',
    tableName: 'sap_location',
    timestamps: true,
    comment: ' site details ',
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
sapSite_1.default.hasMany(SapLocation, {
    onDelete: 'cascade',
    foreignKey: 'site_code'
});
SapLocation.belongsTo(sapSite_1.default, {
    onDelete: 'cascade',
    foreignKey: 'site_code'
});
exports.default = SapLocation;
