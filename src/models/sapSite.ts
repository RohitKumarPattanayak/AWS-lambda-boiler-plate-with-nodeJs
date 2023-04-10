import { DataTypes, Model } from 'sequelize'

import { ISiteAttributes } from '../interfaces/sapSite'

import { connection } from '../config/mysql'

class SapSite extends Model<ISiteAttributes> implements ISiteAttributes {
    public site_code!: string
    public name!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    static associate(models: any) {
        SapSite.hasMany(models.Job)
    }
}

SapSite.init(
    {
        site_code: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            unique: true
        },

        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'SapSite',
        tableName: 'sap_site',
        timestamps: true,
        comment: ' site details ',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default SapSite

