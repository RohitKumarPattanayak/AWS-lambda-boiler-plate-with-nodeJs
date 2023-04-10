import { DataTypes, Model } from 'sequelize'
import { ICateringMenuAttributes } from '../interfaces/cateringMenu'
import { connection } from '../config/mysql'
import SapMenu from './sapMenu'
import CateringRequest from './cateringRequest'

class CateringMenu extends Model<ICateringMenuAttributes> implements ICateringMenuAttributes {
    public id: number
    public catering_request_id: number
    public sap_menu_code: string
    public pax: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

CateringMenu.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        catering_request_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        sap_menu_code: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        pax: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    },
    {
        modelName: 'CateringMenu',
        tableName: 'catering_menu',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

CateringRequest.hasMany(CateringMenu, {
    foreignKey: 'catering_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

CateringMenu.belongsTo(CateringRequest, {
    foreignKey: 'catering_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

SapMenu.hasMany(CateringMenu, {
    foreignKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

CateringMenu.belongsTo(SapMenu, {
    foreignKey: 'sap_menu_code',
    targetKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default CateringMenu

