"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
class PaymentTerms extends sequelize_1.Model {
    static associate(models) { }
}
PaymentTerms.init({
    code: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true
    },
    term: {
        type: sequelize_1.DataTypes.STRING(40)
    },
    is_accessible: {
        type: sequelize_1.DataTypes.TINYINT
    }
}, {
    modelName: 'PaymentTerms',
    tableName: 'payment_terms',
    timestamps: true,
    underscored: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection
});
exports.default = PaymentTerms;
