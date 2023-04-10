import { DataTypes, Model } from 'sequelize'
import { ISapWarehouseAttributes } from '../interfaces/sapWarehouse'
import { connection } from '../config/mysql'

class SapWarehouse extends Model<ISapWarehouseAttributes> implements ISapWarehouseAttributes {
    public sap_warehouse_code!: string
    public sap_warehouse_name: string
    public synced_ts: Date

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

SapWarehouse.init(
    {
        sap_warehouse_code: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        sap_warehouse_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        modelName: 'SapWarehouse',
        tableName: 'sap_warehouse',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default SapWarehouse

