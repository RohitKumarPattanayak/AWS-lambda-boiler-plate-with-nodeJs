import { DataTypes, Model } from 'sequelize'
import { IServiceItemAttributes } from '../interfaces/serviceItem'
import { connection } from '../config/mysql'
import ServiceCatalog from './serviceCatalog'
import MaterialMaster from './materialMaster'
import QuoteLineItem from './quoteLineItem'

class ServiceItem extends Model<IServiceItemAttributes> implements IServiceItemAttributes {
    public id!: number
    public service_code!: string
    public material_code!: string
    public qty!: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

ServiceItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        service_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        material_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        qty: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false
        }
    },
    {
        modelName: 'ServiceItem',
        tableName: 'service_item',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

ServiceCatalog.hasMany(ServiceItem, {
    foreignKey: 'service_code',
    sourceKey: 'service_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

ServiceItem.belongsTo(ServiceCatalog, {
    foreignKey: 'service_code',
    targetKey: 'service_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialMaster.hasMany(ServiceItem, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

ServiceItem.belongsTo(MaterialMaster, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

QuoteLineItem.hasOne(ServiceItem, {
    foreignKey: 'material_code',
    sourceKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

ServiceItem.belongsTo(QuoteLineItem, {
    foreignKey: 'material_code',
    targetKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default ServiceItem

