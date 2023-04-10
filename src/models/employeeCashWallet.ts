import { DataTypes, Model } from 'sequelize'
import { IEmployeeCashWalletAttributes } from '../interfaces/employeeCashWallet'
import { connection } from '../config/mysql'
import Payment from './payment'
import Employee from './employee'

class EmployeeCashWallet extends Model<IEmployeeCashWalletAttributes> implements IEmployeeCashWalletAttributes {
    public id!: number
    public employee_code!: string
    public cr_amount!: number
    public dr_amount!: number
    public payment_id!: number
    public balance: number
    public synced_ts!: Date
    public notes: string

    public sap_ledger_code!: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

EmployeeCashWallet.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        cr_amount: {
            type: DataTypes.DECIMAL(7, 2).UNSIGNED,
            allowNull: true
        },
        dr_amount: {
            type: DataTypes.DECIMAL(7, 2).UNSIGNED,
            allowNull: true
        },
        payment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL(7, 2).UNSIGNED,
            allowNull: false
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: true
        },
        notes: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sap_ledger_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    },
    {
        modelName: 'EmployeeCashWallet',
        tableName: 'employee_cash_wallet',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Payment.hasMany(EmployeeCashWallet, {
    foreignKey: 'payment_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

EmployeeCashWallet.belongsTo(Payment, {
    foreignKey: 'payment_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(EmployeeCashWallet, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

EmployeeCashWallet.belongsTo(Employee, {
    foreignKey: 'employee_code'
})
export default EmployeeCashWallet

