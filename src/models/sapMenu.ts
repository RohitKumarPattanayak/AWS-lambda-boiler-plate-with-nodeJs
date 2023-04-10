import { DataTypes, Model } from 'sequelize'
import { ISapMenuAttributes } from '../interfaces/sapMenu'
import { connection } from '../config/mysql'

class SapMenu extends Model<ISapMenuAttributes> implements ISapMenuAttributes {
    public sap_menu_code: string
    public sap_menu_desc: string
    public sap_menu_name: string
    public price!: number
    public synced_ts: Date

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

SapMenu.init(
    {
        sap_menu_code: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false
        },
        sap_menu_desc: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sap_menu_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: true
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },

    {
        modelName: 'SapMenu',
        tableName: 'sap_menu',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default SapMenu

