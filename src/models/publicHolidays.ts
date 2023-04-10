import { DataTypes, Model } from 'sequelize'
import { IPublicHolidaysAttributes } from '../interfaces/publicHolidays'
import { connection } from '../config/mysql'

class PublicHolidays extends Model<IPublicHolidaysAttributes> implements IPublicHolidaysAttributes {
    public id!: number
    public title!: string
    public date!: Date

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

PublicHolidays.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        modelName: 'PublicHolidays',
        tableName: 'public_holidays',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default PublicHolidays

