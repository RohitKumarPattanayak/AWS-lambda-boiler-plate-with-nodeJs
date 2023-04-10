"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const statusMaster_1 = __importDefault(require("./statusMaster"));
const customer_1 = __importDefault(require("./customer"));
const employee_1 = __importDefault(require("./employee"));
const paymentTerms_1 = __importDefault(require("./paymentTerms"));
class Quote extends sequelize_1.Model {
    static associate(models) { }
}
Quote.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    sap_quote_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
        unique: true
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    discount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    margin: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    job_duration: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    vat: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true
    },
    payment_on_credit: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    },
    site_visit_require: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false
    },
    created_supervisor_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    assigned_supervisor_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    assigned_by_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    status_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    payment_mode: {
        type: sequelize_1.DataTypes.ENUM('cash', 'cheque'),
        allowNull: true
    },
    paid: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true
    },
    copy_of_quote: {
        type: sequelize_1.DataTypes.ENUM('digital', 'physical'),
        allowNull: false
    },
    payment_terms_code: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    },
    init_comments: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    site_visited_status: { type: sequelize_1.DataTypes.TINYINT, allowNull: true, defaultValue: 0 }
}, {
    modelName: 'Quote',
    tableName: 'quote',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
statusMaster_1.default.hasMany(Quote, {
    foreignKey: 'status_code',
    sourceKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Quote.belongsTo(statusMaster_1.default, {
    foreignKey: 'status_code',
    targetKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
customer_1.default.hasMany(Quote, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Quote.belongsTo(customer_1.default, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Quote, {
    foreignKey: 'created_supervisor_id',
    as: 'Created_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Quote.belongsTo(employee_1.default, {
    foreignKey: 'created_supervisor_id',
    targetKey: 'sap_employee_code',
    as: 'Created_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Quote, {
    foreignKey: 'assigned_supervisor_id',
    as: 'Assigned_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Quote.belongsTo(employee_1.default, {
    foreignKey: 'assigned_supervisor_id',
    as: 'Assigned_supervisor_name',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
employee_1.default.hasMany(Quote, {
    foreignKey: 'assigned_by_id',
    as: 'Assigned__by_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Quote.belongsTo(employee_1.default, {
    foreignKey: 'assigned_by_id',
    as: 'Assigned_by_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
paymentTerms_1.default.hasMany(Quote, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
});
Quote.belongsTo(paymentTerms_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
});
exports.default = Quote;
