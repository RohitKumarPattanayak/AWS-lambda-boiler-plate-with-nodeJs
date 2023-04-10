import { DataTypes, Model } from 'sequelize'
import { ICateringMenuGroupAttributes } from '../interfaces/cateringMenuGroup'
import { connection } from '../config/mysql'
import SapMenu from './sapMenu'

class CateringMenuGroup extends Model<ICateringMenuGroupAttributes> implements ICateringMenuGroupAttributes {
    public id: number
    public menu_group_code: string
    public sap_menu_code: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

CateringMenuGroup.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        menu_group_code: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        sap_menu_code: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    },
    {
        modelName: 'CateringMenuGroup',
        tableName: 'catering_menu_group',
        timestamps: true,
        underscored: true,
        indexes: [
            {
                name: 'menu_group_indexed_code',
                fields: ['menu_group_code']
            }
        ],
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

SapMenu.hasMany(CateringMenuGroup, {
    foreignKey: 'sap_menu_code',
    sourceKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

CateringMenuGroup.belongsTo(SapMenu, {
    foreignKey: 'sap_menu_code',
    targetKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default CateringMenuGroup

