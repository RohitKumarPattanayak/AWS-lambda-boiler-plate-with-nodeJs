"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const sequelize_typescript_1 = require("sequelize-typescript");
const serviceGroup_1 = __importDefault(require("./serviceGroup"));
const paymentTerms_1 = __importDefault(require("./paymentTerms"));
const customerType_1 = __importDefault(require("./customerType"));
class Customer extends sequelize_1.Model {
    static associate(models) { }
}
Customer.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    customer_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true
    },
    mobile_number: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    vat: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false
    },
    is_vat_applicable: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    address_line_1: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    address_line_2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    zipcode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    is_company: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    total_outstanding_amount: {
        type: sequelize_1.DataTypes.DOUBLE.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    },
    payment_terms_code: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    },
    service_group: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    }
}, {
    modelName: 'Customer',
    tableName: 'customer',
    timestamps: true,
    comment: 'Since app has the feature to add new customer ID and Ref_id are maintianed',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
serviceGroup_1.default.hasMany(Customer, {
    foreignKey: 'service_group',
    sourceKey: 'id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Customer.belongsTo(serviceGroup_1.default, {
    foreignKey: 'service_group',
    targetKey: 'id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
paymentTerms_1.default.hasMany(Customer, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
});
Customer.belongsTo(paymentTerms_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
});
customerType_1.default.hasMany(Customer, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'type'
});
Customer.belongsTo(customerType_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'type'
});
exports.default = Customer;
