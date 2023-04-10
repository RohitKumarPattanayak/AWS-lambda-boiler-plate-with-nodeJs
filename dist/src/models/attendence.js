"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const employee_1 = __importDefault(require("./employee"));
const job_1 = __importDefault(require("./job"));
class Attendence extends sequelize_1.Model {
    static associate(models) { }
}
Attendence.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    in_date_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    out_date_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    in_photo_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    in_comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    out_comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    out_photo_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    in_modified_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    out_modified_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    }
}, {
    modelName: 'Attendence',
    tableName: 'attendence',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
job_1.default.hasMany(Attendence, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Attendence.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Attendence, {
    foreignKey: 'employee_code',
    as: 'Attendence',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Attendence.belongsTo(employee_1.default, {
    foreignKey: 'employee_code',
    as: 'Attendence',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Attendence, {
    foreignKey: 'in_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Attendence.belongsTo(employee_1.default, {
    foreignKey: 'in_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Attendence, {
    foreignKey: 'out_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Attendence.belongsTo(employee_1.default, {
    foreignKey: 'out_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Attendence, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Attendence.belongsTo(employee_1.default, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
exports.default = Attendence;
