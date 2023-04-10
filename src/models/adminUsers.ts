import { DataTypes, Model } from 'sequelize'
import { IAdminUsersAttributes } from '../interfaces/adminUsers'
import { connection } from '../config/mysql'

class AdminUsers extends Model<IAdminUsersAttributes> implements IAdminUsersAttributes {
    public id!: number
    public username!: string
    public password!: string
    public is_active!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

AdminUsers.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        modelName: 'adminUsers',
        tableName: 'admin_users',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

export default AdminUsers

