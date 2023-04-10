import { DataTypes, Model } from 'sequelize'
import { ICustomerAttributes } from '../interfaces/customer'
import { connection } from '../config/mysql'
import { DataType } from 'sequelize-typescript'
import ServiceGroup from './serviceGroup'
import PaymentTerms from './paymentTerms'
import CustomerType from './customerType'

class Customer extends Model<ICustomerAttributes> implements ICustomerAttributes {
    public id!: number
    public customer_code: string
    public name: string
    public mobile_number: string
    public vat: number
    public email: string
    public is_vat_applicable: number
    public address_line_1: string
    public address_line_2: string
    public city: string
    public zipcode: number
    public is_company: number
    public total_outstanding_amount: number
    public payment_terms_code: string
    public type: string
    public service_group: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        customer_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataType.STRING(50),
            allowNull: true
        },
        mobile_number: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        vat: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
        is_vat_applicable: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        address_line_1: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        address_line_2: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_company: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        total_outstanding_amount: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        payment_terms_code: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        service_group: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    },
    {
        modelName: 'Customer',
        tableName: 'customer',
        timestamps: true,
        comment: 'Since app has the feature to add new customer ID and Ref_id are maintianed',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

ServiceGroup.hasMany(Customer, {
    foreignKey: 'service_group',
    sourceKey: 'id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Customer.belongsTo(ServiceGroup, {
    foreignKey: 'service_group',
    targetKey: 'id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

PaymentTerms.hasMany(Customer, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
})
Customer.belongsTo(PaymentTerms, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
})

CustomerType.hasMany(Customer, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'type'
})
Customer.belongsTo(CustomerType, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'type'
})

export default Customer

