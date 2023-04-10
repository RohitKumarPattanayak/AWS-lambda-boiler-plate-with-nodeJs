import { DataTypes, Model } from 'sequelize'
import { IInvoiceAttributes } from '../interfaces/invoice'
import { connection } from '../config/mysql'
import Job from '../models/job'

class Invoice extends Model<IInvoiceAttributes> implements IInvoiceAttributes {
    public id!: number
    public job_code!: string
    public status!: string
    public sap_invoice_date: Date
    public sap_invoice_code: string
    public sap_invoice_due_date: Date
    public sap_invoice_amount: number
    public discount: number
    public vat: number
    public due_amount: number
    public pre_payment: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('ready to invoice', 'invoiced', 'pending collection', 'closed'),
            allowNull: true
        },
        sap_invoice_date: {
            type: DataTypes.DATE
        },
        sap_invoice_code: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        sap_invoice_due_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        sap_invoice_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        vat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        due_amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        pre_payment: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    },
    {
        modelName: 'Invoice',
        tableName: 'invoice',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Job.hasMany(Invoice, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
})
Invoice.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
})

export default Invoice

