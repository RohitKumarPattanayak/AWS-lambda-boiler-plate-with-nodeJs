import { DataTypes, Model } from 'sequelize'
import { IMaterialRequestItemAttributes } from '../interfaces/materialRequestItem'
import { connection } from '../config/mysql'

import MaterialRequest from './materialRequest'
import MaterialMaster from './materialMaster'

class MaterialRequestItem extends Model<IMaterialRequestItemAttributes> implements IMaterialRequestItemAttributes {
    public id!: number
    public request_id: number
    public material_code: string
    public requested_qty: number
    public delivered_qty: number
    public approved_qty: number
    public rejected_qty: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

MaterialRequestItem.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        request_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        material_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        requested_qty: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: true
        },
        approved_qty: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        rejected_qty: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        delivered_qty: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
    {
        modelName: 'MaterialRequestItem',
        tableName: 'material_request_item',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

MaterialMaster.hasMany(MaterialRequestItem, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequestItem.belongsTo(MaterialMaster, {
    foreignKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequest.hasMany(MaterialRequestItem, {
    foreignKey: 'request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequestItem.belongsTo(MaterialRequest, {
    foreignKey: 'request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
export default MaterialRequestItem

