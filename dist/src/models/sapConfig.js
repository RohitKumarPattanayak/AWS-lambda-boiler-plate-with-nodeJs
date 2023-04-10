"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class SapConfig extends sequelize_1.Model {
}
SapConfig.init({
    monthly_emp_max_hrs: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    monthly_emp_max_alert_hrs: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    site_coverage_limit_meters: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    regular_hrs_max: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: true
    },
    vat_percentage: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    payment_terms: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    }
}, {
    modelName: 'SapConfig',
    tableName: 'sap_config',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = SapConfig;
