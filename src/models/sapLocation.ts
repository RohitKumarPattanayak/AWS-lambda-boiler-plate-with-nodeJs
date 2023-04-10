import { DataTypes, Model } from 'sequelize'

import { ISapLocationAttributes } from '../interfaces/sapLocation'

import { connection } from '../config/mysql'
import SapSite from './sapSite'

class SapLocation extends Model<ISapLocationAttributes> implements ISapLocationAttributes {
    public id!: number
    public site_code!: string
    public latitude: number
    public longitude: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    static associate(models: any) {
        SapLocation.hasMany(models.Job)
    }
}

SapLocation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        site_code: {
            type: DataTypes.STRING(20),

            allowNull: false
        },

        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
    {
        modelName: 'SapLocation',
        tableName: 'sap_location',
        timestamps: true,
        comment: ' site details ',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

SapSite.hasMany(SapLocation, {
    onDelete: 'cascade',
    foreignKey: 'site_code'
})
SapLocation.belongsTo(SapSite, {
    onDelete: 'cascade',
    foreignKey: 'site_code'
})

export default SapLocation

