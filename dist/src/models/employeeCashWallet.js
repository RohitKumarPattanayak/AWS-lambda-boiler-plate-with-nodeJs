"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const payment_1 = __importDefault(require("./payment"));
const employee_1 = __importDefault(require("./employee"));
class EmployeeCashWallet extends sequelize_1.Model {
    static associate(models) { }
}
EmployeeCashWallet.init({
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
    cr_amount: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2).UNSIGNED,
        allowNull: true
    },
    dr_amount: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2).UNSIGNED,
        allowNull: true
    },
    payment_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(7, 2).UNSIGNED,
        allowNull: false
    },
    synced_ts: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    notes: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    sap_ledger_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    }
}, {
    modelName: 'EmployeeCashWallet',
    tableName: 'employee_cash_wallet',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
payment_1.default.hasMany(EmployeeCashWallet, {
    foreignKey: 'payment_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
EmployeeCashWallet.belongsTo(payment_1.default, {
    foreignKey: 'payment_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(EmployeeCashWallet, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
EmployeeCashWallet.belongsTo(employee_1.default, {
    foreignKey: 'employee_code'
});
exports.default = EmployeeCashWallet;
