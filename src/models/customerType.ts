import { DataTypes, Model } from 'sequelize'
import { ICustomerAttributes } from '../interfaces/customerType'
import { connection } from '../config/mysql'

class CustomerType extends Model<ICustomerAttributes> implements ICustomerAttributes {
    public code!: string
    public type!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

CustomerType.init(
    {
        code: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'CustomerType',
        tableName: 'customer_type`',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default CustomerType

