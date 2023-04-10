import { DataTypes, Model } from 'sequelize'

import { ISiteAttributes } from '../interfaces/statusMaster'

import { connection } from '../config/mysql'

class StatusMaster extends Model<ISiteAttributes> implements ISiteAttributes {
    public id!: number
    public status_code!: string
    public desc!: string
    public is_active: number
    public type!: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date
    static associate(models: any) {
        StatusMaster.hasMany(models.Job)
    }
}

StatusMaster.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(30),
            allowNull: false
        },

        status_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('job', 'quote', 'materialrequest', 'catering_pickup', 'task'),
            allowNull: false
        }
    },

    {
        modelName: 'StatusMaster',
        tableName: 'status_master',
        timestamps: true,
        comment: ' site details ',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default StatusMaster

