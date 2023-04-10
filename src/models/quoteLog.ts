import { DataTypes, Model } from 'sequelize'
import { IQuoteLogAttributes } from '../interfaces/quoteLog'
import { connection } from '../config/mysql'
import Quote from './quote'
import Employee from './employee'

class QuoteLog extends Model<IQuoteLogAttributes> implements IQuoteLogAttributes {
    public id!: number
    public quote_id!: number
    public date: Date
    public supervisor_code: string
    public old_quote_obj: string
    public new_quote_obj: string
    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

QuoteLog.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        quote_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        supervisor_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        old_quote_obj: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        new_quote_obj: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        modelName: 'QuoteLog',
        tableName: 'quote_log',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Quote.hasMany(QuoteLog, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteLog.belongsTo(Quote, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(QuoteLog, {
    foreignKey: 'supervisor_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteLog.belongsTo(Employee, {
    foreignKey: 'supervisor_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default QuoteLog

