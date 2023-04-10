import { DataTypes, Model } from 'sequelize'

import { ISiteAttributes } from '../interfaces/sapContract'

import { connection } from '../config/mysql'

class SapContract extends Model<ISiteAttributes> implements ISiteAttributes {
    public name!: string

    public contract_code!: string
    public project_id!: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date
    static associate(models: any) {}
}

SapContract.init(
    {
        contract_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            unique: true
        },

        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        project_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: 0
        }
    },

    {
        modelName: 'SapContract',
        tableName: 'sap_contract',
        timestamps: true,
        comment: ' site details ',
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default SapContract

