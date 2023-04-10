"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const employee_1 = __importDefault(require("./employee"));
const statusMaster_1 = __importDefault(require("./statusMaster"));
class MaterialRequest extends sequelize_1.Model {
    static associate(models) { }
}
MaterialRequest.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    warehouse_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    requested_by_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    comment: {
        type: sequelize_1.DataTypes.STRING(100),
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
    modelName: 'MaterialRequest',
    tableName: 'material_request',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
employee_1.default.hasMany(MaterialRequest, {
    foreignKey: 'requested_by_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialRequest.belongsTo(employee_1.default, {
    foreignKey: 'requested_by_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
statusMaster_1.default.hasOne(MaterialRequest, {
    foreignKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
MaterialRequest.belongsTo(statusMaster_1.default, {
    foreignKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
//UPCOMING: association for warehouse
// SapWarehouse.hasMany(MaterialRequest, {
//     foreignKey: 'warehouse_code',
//     onDelete: 'cascade',
//     onUpdate: 'cascade'
// })
// MaterialRequest.belongsTo(SapWarehouse, {
//     foreignKey: 'warehouse_code',
//     onDelete: 'cascade',
//     onUpdate: 'cascade'
// })
exports.default = MaterialRequest;
