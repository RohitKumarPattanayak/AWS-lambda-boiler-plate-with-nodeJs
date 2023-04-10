import { DataTypes, Model } from 'sequelize'
import { IQuoteInitChecklistAttributes } from '../interfaces/quoteInitChecklist'
import { connection } from '../config/mysql'
import Quote from './quote'
import InitiationCheckList from './initiationChecklist'

class QuoteInitChecklist extends Model<IQuoteInitChecklistAttributes> implements IQuoteInitChecklistAttributes {
    public id!: number
    public quote_id!: number
    public checklist_id!: number
    public value: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

QuoteInitChecklist.init(
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
        checklist_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        value: {
            type: DataTypes.TINYINT,
            allowNull: true
        }
    },
    {
        modelName: 'QuoteInitChecklist',
        tableName: 'quote_init_checklist',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Quote.hasMany(QuoteInitChecklist, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteInitChecklist.belongsTo(Quote, {
    foreignKey: 'quote_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

InitiationCheckList.hasMany(QuoteInitChecklist, {
    foreignKey: 'checklist_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteInitChecklist.belongsTo(InitiationCheckList, {
    foreignKey: 'checklist_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default QuoteInitChecklist

