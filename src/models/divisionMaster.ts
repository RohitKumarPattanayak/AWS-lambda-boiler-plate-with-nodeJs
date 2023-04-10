import { DataTypes, Model } from 'sequelize'
import { IDivisionMasterAttributes } from '../interfaces/divisionMaster'
import { connection } from '../config/mysql'

class DivisionMaster extends Model<IDivisionMasterAttributes> implements IDivisionMasterAttributes {
    public id!: number
    public division_code: string
    public name!: string
    public icon_filename: string
    public is_active!: number
    public is_catering!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

DivisionMaster.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        division_code: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        icon_filename: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'default.png'
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        is_catering: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        modelName: 'DivisionMaster',
        tableName: 'division_master',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default DivisionMaster

