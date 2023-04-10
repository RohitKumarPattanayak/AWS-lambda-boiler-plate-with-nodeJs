import { DataTypes, Model } from 'sequelize'
import { IServiceCatalogAttributes } from '../interfaces/serviceCatalog'
import { connection } from '../config/mysql'
import DivisionMaster from './divisionMaster'

class ServiceCatalog extends Model<IServiceCatalogAttributes> implements IServiceCatalogAttributes {
    public id!: number
    public description: string
    public service_code: string
    public price!: number
    public display_order!: number
    public division_id!: string
    public service_name!: string
    public unit_descriptor: string
    public service_type: string
    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

ServiceCatalog.init(
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
            allowNull: true,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: true
        },
        display_order: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        division_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        service_name: {
            type: DataTypes.STRING(100)
        },
        unit_descriptor: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        service_type: {
            type: DataTypes.ENUM('custom', 'regular'),
            allowNull: true
        }
    },
    {
        modelName: 'ServiceCatalog',
        tableName: 'service_catalog',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

DivisionMaster.hasMany(ServiceCatalog, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

ServiceCatalog.belongsTo(DivisionMaster, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default ServiceCatalog

