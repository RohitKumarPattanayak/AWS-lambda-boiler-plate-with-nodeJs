import { DataTypes, Model } from 'sequelize'
import { IMaterialRequestAttributes } from '../interfaces/materialRequest'
import { connection } from '../config/mysql'
import Employee from './employee'
import StatusMaster from './statusMaster'
import SapWarehouse from './sapWarehouse'

class MaterialRequest extends Model<IMaterialRequestAttributes> implements IMaterialRequestAttributes {
    public id!: number
    public warehouse_code: string
    public requested_by_employee_code: string
    public comment: string
    public synced_ts: Date
    public status_code: string
    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

MaterialRequest.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        warehouse_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        requested_by_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'MaterialRequest',
        tableName: 'material_request',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Employee.hasMany(MaterialRequest, {
    foreignKey: 'requested_by_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequest.belongsTo(Employee, {
    foreignKey: 'requested_by_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

StatusMaster.hasOne(MaterialRequest, {
    foreignKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequest.belongsTo(StatusMaster, {
    foreignKey: 'status_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

//UPCOMING: association for warehouse
// SapWarehouse.hasMany(MaterialRequest, {
//     foreignKey: 'warehouse_code',
//     onDelete: 'cascade',
//     onUpdate: 'cascade'
// })

// MaterialRequest.belongsTo(SapWarehouse, {
//     foreignKey: 'warehouse_code',
//     onDelete: 'cascade',
//     onUpdate: 'cascade'
// })
export default MaterialRequest

