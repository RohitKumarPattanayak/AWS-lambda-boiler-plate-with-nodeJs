import { DataTypes, Model } from 'sequelize'
import { IServiceGroupAttributes } from '../interfaces/serviceGroup'
import { connection } from '../config/mysql'

class ServiceGroup extends Model<IServiceGroupAttributes> implements IServiceGroupAttributes {
    public id!: number
    public service_group_code: number
    public name!: string
    public is_active!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

ServiceGroup.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        service_group_code: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },
    {
        modelName: 'ServiceGroup',
        tableName: 'service_group',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

export default ServiceGroup

