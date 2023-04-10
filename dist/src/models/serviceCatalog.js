"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const divisionMaster_1 = __importDefault(require("./divisionMaster"));
class ServiceCatalog extends sequelize_1.Model {
    static associate(models) { }
}
ServiceCatalog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    service_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: true
    },
    display_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    division_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    service_name: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    unit_descriptor: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    service_type: {
        type: sequelize_1.DataTypes.ENUM('custom', 'regular'),
        allowNull: true
    }
}, {
    modelName: 'ServiceCatalog',
    tableName: 'service_catalog',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
divisionMaster_1.default.hasMany(ServiceCatalog, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
ServiceCatalog.belongsTo(divisionMaster_1.default, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = ServiceCatalog;
