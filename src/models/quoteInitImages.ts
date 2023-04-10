import { DataTypes, Model } from 'sequelize'
import { IQuoteInitImagesAttributes } from '../interfaces/quoteInitImages'
import { connection } from '../config/mysql'
import Quote from './quote'

class QuoteInitImages extends Model<IQuoteInitImagesAttributes> implements IQuoteInitImagesAttributes {
    public id!: number
    public quote_id!: number
    public image_url: string
    public type: Enumerator

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

QuoteInitImages.init(
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
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('init', 'approve'),
            allowNull: false,
            defaultValue: 'init'
        }
    },
    {
        modelName: 'QuoteInitImages',
        tableName: 'quote_images',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Quote.hasMany(QuoteInitImages, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteInitImages.belongsTo(Quote, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default QuoteInitImages

