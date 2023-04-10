import { DataTypes, Model } from 'sequelize'
import { IQuoteAttributes } from '../interfaces/quote'
import { connection } from '../config/mysql'
import StatusMaster from './statusMaster'
import Customer from './customer'
import Employee from './employee'
import PaymentTerms from './paymentTerms'

class Quote extends Model<IQuoteAttributes> implements IQuoteAttributes {
    public id!: number
    public customer_id!: string
    public sap_quote_id!: string
    public start_date: Date
    public status_code!: string
    public total: number
    public margin: number
    public discount: number
    public vat: number
    public job_duration: number
    public payment_on_credit: number
    public site_visit_require: number
    public site_visited_status: number
    public created_supervisor_id: string
    public assigned_supervisor_id: string
    public payment_mode: string
    public paid: number
    public copy_of_quote: string
    public payment_terms_code: string
    public init_comments: string
    public assigned_by_id: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

Quote.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        sap_quote_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true
        },
        customer_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        discount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        margin: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        job_duration: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        vat: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: true
        },
        payment_on_credit: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        site_visit_require: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        created_supervisor_id: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        assigned_supervisor_id: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        assigned_by_id: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        status_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        payment_mode: {
            type: DataTypes.ENUM('cash', 'cheque'),
            allowNull: true
        },
        paid: {
            type: DataTypes.TINYINT,
            allowNull: true
        },
        copy_of_quote: {
            type: DataTypes.ENUM('digital', 'physical'),
            allowNull: false
        },
        payment_terms_code: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        init_comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        site_visited_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 }
    },
    {
        modelName: 'Quote',
        tableName: 'quote',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

StatusMaster.hasMany(Quote, {
    foreignKey: 'status_code',
    sourceKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Quote.belongsTo(StatusMaster, {
    foreignKey: 'status_code',
    targetKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Customer.hasMany(Quote, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Quote.belongsTo(Customer, {
    foreignKey: 'customer_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Quote, {
    foreignKey: 'created_supervisor_id',
    as: 'Created_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Quote.belongsTo(Employee, {
    foreignKey: 'created_supervisor_id',
    targetKey: 'sap_employee_code',
    as: 'Created_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Quote, {
    foreignKey: 'assigned_supervisor_id',
    as: 'Assigned_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Quote.belongsTo(Employee, {
    foreignKey: 'assigned_supervisor_id',
    as: 'Assigned_supervisor_name',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Quote, {
    foreignKey: 'assigned_by_id',
    as: 'Assigned__by_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Quote.belongsTo(Employee, {
    foreignKey: 'assigned_by_id',
    as: 'Assigned_by_supervisor_name',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

PaymentTerms.hasMany(Quote, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
})
Quote.belongsTo(PaymentTerms, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'payment_terms_code'
})
export default Quote

