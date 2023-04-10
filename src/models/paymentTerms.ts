import { DataTypes, Model } from 'sequelize'
import { IPaymentTermsAttributes } from '../interfaces/paymentTerms'
import { connection } from '../config/mysql'
import Job from './job'
import Customer from './customer'
import Employee from './employee'

class PaymentTerms extends Model<IPaymentTermsAttributes> implements IPaymentTermsAttributes {
    public code!: string
    public term!: string
    public is_accessible!: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

PaymentTerms.init(
    {
        code: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        term: {
            type: DataTypes.STRING(40)
        },
        is_accessible: {
            type: DataTypes.TINYINT
        }
    },
    {
        modelName: 'PaymentTerms',
        tableName: 'payment_terms',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default PaymentTerms

