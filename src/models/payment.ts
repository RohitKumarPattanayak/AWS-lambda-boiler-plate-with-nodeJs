import { DataTypes, Model } from 'sequelize'
import { IPaymentAttributes } from '../interfaces/payment'
import { connection } from '../config/mysql'
import Job from './job'
import Customer from './customer'
import Employee from './employee'

class Payment extends Model<IPaymentAttributes> implements IPaymentAttributes {
    public id!: number
    public job_code!: string
    public payment_mode!: string
    public amount!: number
    public image_url!: string
    public collected_employee_code!: string
    public synced_ts: Date
    public customer_id!: number
    public cheque_sap_handover_status: number
    public cheque_bounce: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        payment_mode: {
            type: DataTypes.ENUM('cash', 'cheque'),
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        collected_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: true
        },
        customer_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        cheque_sap_handover_status: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 0
        },
        cheque_bounce: {
            type: DataTypes.TINYINT,
            allowNull: true
        }
    },
    {
        modelName: 'Payment',
        tableName: 'payment',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Job.hasMany(Payment, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Payment.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Customer.hasMany(Payment, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Payment.belongsTo(Customer, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Payment, {
    foreignKey: 'collected_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Payment.belongsTo(Employee, {
    foreignKey: 'collected_employee_code'
})

export default Payment

