import { DataTypes, Model } from 'sequelize'
import { IEquipmentMasterAttributes } from '../interfaces/sapEquipmentMaster'
import { connection } from '../config/mysql'

class EquipmentMaster extends Model<IEquipmentMasterAttributes> implements IEquipmentMasterAttributes {
    public equipment_code!: string
    public name: string
    public is_active: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

EquipmentMaster.init(
    {
        equipment_code: {
            type: DataTypes.STRING(10),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },

    {
        modelName: 'EquipmentMaster',
        tableName: 'sap_equipment_master',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default EquipmentMaster

