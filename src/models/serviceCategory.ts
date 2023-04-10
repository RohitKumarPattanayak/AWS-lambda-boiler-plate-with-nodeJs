import { DataTypes, Model } from 'sequelize'
import { IServiceCategoryAttributes } from '../interfaces/serviceCategory'
import { connection } from '../config/mysql'

class ServiceCategory extends Model<IServiceCategoryAttributes> implements IServiceCategoryAttributes {
    public id!: number
    public category_code!: string
    public category_name!: string
    public display_position!: number
    public parent_category_code!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

ServiceCategory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        category_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        display_position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        parent_category_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'ServiceCategory',
        tableName: 'service_category',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default ServiceCategory

