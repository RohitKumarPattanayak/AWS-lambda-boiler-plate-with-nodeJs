"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const job_1 = __importDefault(require("./job"));
const customer_1 = __importDefault(require("./customer"));
const employee_1 = __importDefault(require("./employee"));
class Payment extends sequelize_1.Model {
    static associate(models) { }
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    payment_mode: {
        type: sequelize_1.DataTypes.ENUM('cash', 'cheque'),
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: false
    },
    image_url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    collected_employee_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    cheque_sap_handover_status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    cheque_bounce: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true
    }
}, {
    modelName: 'Payment',
    tableName: 'payment',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
job_1.default.hasMany(Payment, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Payment.belongsTo(job_1.default, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
customer_1.default.hasMany(Payment, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Payment.belongsTo(customer_1.default, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Payment, {
    foreignKey: 'collected_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Payment.belongsTo(employee_1.default, {
    foreignKey: 'collected_employee_code'
});
exports.default = Payment;
