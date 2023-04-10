"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mysql_1 = require("../config/mysql");
const sapSite_1 = __importDefault(require("./sapSite"));
const statusMaster_1 = __importDefault(require("./statusMaster"));
const divisionMaster_1 = __importDefault(require("./divisionMaster"));
const quote_1 = __importDefault(require("./quote"));
const paymentTerms_1 = __importDefault(require("./paymentTerms"));
class Job extends sequelize_1.Model {
    static associate(models) {
        Job.hasMany(models.Supervisor);
    }
}
Job.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    sap_job_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    status_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: statusMaster_1.default,
            key: 'status_code'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    is_oneoff_job: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },
    sap_site_code: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
        // references: {
        //     model: SapSite,
        //     key: 'site_code'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
    },
    sap_quote_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    division_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: divisionMaster_1.default,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    is_location_enable: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    spc_form_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    start_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    end_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    catering_type: {
        type: sequelize_1.DataTypes.ENUM('internal', 'external'),
        allowNull: true
    },
    payment_terms_code: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    }
}, {
    modelName: 'Job',
    tableName: 'job',
    timestamps: true,
    comment: '',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize: mysql_1.connection,
    underscored: true
});
sapSite_1.default.hasMany(Job, {
    onDelete: 'cascade',
    foreignKey: 'sap_site_code'
});
Job.belongsTo(sapSite_1.default, {
    onDelete: 'cascade',
    foreignKey: 'sap_site_code'
});
Job.belongsTo(statusMaster_1.default, {
    foreignKey: 'status_code'
});
Job.belongsTo(divisionMaster_1.default, {
    foreignKey: 'division_id'
});
//NEEDED ASSOCIATION:
quote_1.default.hasMany(Job, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    sourceKey: 'sap_quote_id',
    foreignKey: 'sap_quote_id'
});
Job.belongsTo(quote_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    targetKey: 'sap_quote_id',
    foreignKey: 'sap_quote_id'
});
paymentTerms_1.default.hasMany(Job, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
});
Job.belongsTo(paymentTerms_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
});
exports.default = Job;
