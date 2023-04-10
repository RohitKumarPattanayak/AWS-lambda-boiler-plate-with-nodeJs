"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const job_1 = __importDefault(require("../models/job"));
class Invoice extends sequelize_1.Model {
}
Invoice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('ready to invoice', 'invoiced', 'pending collection', 'closed'),
        allowNull: true
    },
    sap_invoice_date: {
        type: sequelize_1.DataTypes.DATE
    },
    sap_invoice_code: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    sap_invoice_due_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    sap_invoice_amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    vat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    due_amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    pre_payment: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    }
}, {
    modelName: 'Invoice',
    tableName: 'invoice',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
job_1.default.hasMany(Invoice, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
Invoice.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
});
exports.default = Invoice;
