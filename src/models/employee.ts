import { DataTypes, Model } from 'sequelize'
import { IEmployeeAttributes } from '../interfaces/employee'
import { connection } from '../config/mysql'
import { Role } from '../models'

class Employee extends Model<IEmployeeAttributes> implements IEmployeeAttributes {
    public id!: number
    public sap_employee_code!: string
    public role_code!: string
    public first_name!: string
    public last_name!: string
    public phone: number
    public email: string
    public is_active!: number
    public photo_url: string
    public password!: string
    public last_login_ts: Date
    public fcm: string
    public has_app_access!: number
    public daily_contract_hrs: number
    public emp_type!: number
    public key!: string
    public sex: string
    public country: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // static associate(models: any) {

    // }
}

Employee.init(
    {
        sap_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: Role,
                key: 'role_code'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        photo_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        last_login_ts: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fcm: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        has_app_access: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        daily_contract_hrs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 8
        },
        emp_type: {
            type: DataTypes.ENUM('omani', 'expat', 'women'),
            allowNull: false,
            defaultValue: 'omani'
        },
        key: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true
        },
        sex: {
            type: DataTypes.ENUM('male', 'female', 'transgender'),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        modelName: 'Employee',
        tableName: 'employee',
        timestamps: true,
        comment: 'This contains employees data',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Employee.belongsTo(Role, {
    onDelete: 'cascade',
    foreignKey: 'role_code',
    hooks: true
})

export default Employee

