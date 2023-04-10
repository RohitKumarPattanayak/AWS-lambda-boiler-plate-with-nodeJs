import { DataTypes, Model } from 'sequelize'
import { IQuoteItemAttributes } from '../interfaces/quoteItem'
import { connection } from '../config/mysql'
import Quote from './quote'
import ServiceCatalog from './serviceCatalog'
class QuoteItem extends Model<IQuoteItemAttributes> implements IQuoteItemAttributes {
    public id!: number
    public quote_id!: number
    public service_id!: number
    public service_name: string
    public service_desc: string
    public qty: number
    public price: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

QuoteItem.init(
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
        service_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        qty: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: true
        },
        service_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        service_desc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false
        }
    },
    {
        modelName: 'QuoteItem',
        tableName: 'quote_item',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        indexes: [
            {
                name: 'quote_service_id',
                unique: true,
                fields: ['service_id', 'quote_id']
            }
        ],
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Quote.hasMany(QuoteItem, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteItem.belongsTo(Quote, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

ServiceCatalog.hasMany(QuoteItem, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteItem.belongsTo(ServiceCatalog, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default QuoteItem

