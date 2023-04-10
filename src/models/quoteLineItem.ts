import { DataTypes, Model } from 'sequelize'
import { IQuoteLineItemAttributes } from '../interfaces/quoteLineItem'
import { connection } from '../config/mysql'
import MaterialMaster from './materialMaster'
import QuoteItem from './quoteItem'

class QuoteLineItem extends Model<IQuoteLineItemAttributes> implements IQuoteLineItemAttributes {
    public id!: number
    public quote_item_id!: number
    public material_code!: string
    public qty: number
    public price!: number
    public unit_descriptor: string
    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

QuoteLineItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        quote_item_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        material_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        qty: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(8, 2).UNSIGNED,
            allowNull: true
        },
        unit_descriptor: {
            type: DataTypes.STRING(40),
            allowNull: true
        }
    },
    {
        modelName: 'QuoteLineItem',
        tableName: 'quote_line_item',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

QuoteItem.hasMany(QuoteLineItem, {
    foreignKey: 'quote_item_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteLineItem.belongsTo(QuoteItem, {
    foreignKey: 'quote_item_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialMaster.hasMany(QuoteLineItem, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteLineItem.belongsTo(MaterialMaster, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default QuoteLineItem

