"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class SapSite extends sequelize_1.Model {
    static associate(models) {
        SapSite.hasMany(models.Job);
    }
}
SapSite.init({
    site_code: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    modelName: 'SapSite',
    tableName: 'sap_site',
    timestamps: true,
    comment: ' site details ',
    underscored: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = SapSite;
