import { DataTypes, Model } from 'sequelize'
import { IRoleAttributes } from '../interfaces/role'
import { connection } from '../config/mysql'

class Role extends Model<IRoleAttributes> implements IRoleAttributes {
    public id!: number
    public name!: string
    public role_code!: string
    public staff_type: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {
        Role.hasOne(models.Employee)
    }
}

Role.init(
    {
        role_code: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        staff_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: 'Role',
        tableName: 'role',
        timestamps: true,
        comment: ' site supervisor \n site manager \n divison manager ',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default Role

