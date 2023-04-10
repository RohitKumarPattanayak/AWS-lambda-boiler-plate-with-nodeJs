"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const divisionMaster_1 = __importDefault(require("./divisionMaster"));
class MaterialMaster extends sequelize_1.Model {
    static associate(models) { }
}
MaterialMaster.init({
    material_code: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    material_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    },
    unit_descriptor: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    division_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT.UNSIGNED,
        allowNull: false
    },
    image_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('man-power', 'material', 'equipment'),
        allowNull: false
    }
}, {
    modelName: 'MaterialMaster',
    tableName: 'sap_material_master',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
divisionMaster_1.default.hasMany(MaterialMaster, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialMaster.belongsTo(divisionMaster_1.default, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = MaterialMaster;
