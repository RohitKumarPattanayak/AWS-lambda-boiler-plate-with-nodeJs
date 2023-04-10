import { DataTypes, Model } from 'sequelize'
import { IMaterialRequestActionAttributes } from '../interfaces/materialRequestAction'
import { connection } from '../config/mysql'
import Employee from './employee'
import StatusMaster from './statusMaster'
import MaterialRequest from './materialRequest'
import MaterialMaster from './materialMaster'

class MaterialRequestAction extends Model<IMaterialRequestActionAttributes> implements IMaterialRequestActionAttributes {
    public id!: number
    public material_request_id: number
    public action: string
    public action_employee_code: string
    public comment: string
    public action_role: string
    public quantity: number

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

MaterialRequestAction.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        material_request_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        action: {
            type: DataTypes.ENUM('approved', 'rejected', 'delivered'),
            allowNull: false
        },
        action_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        action_role: {
            type: DataTypes.ENUM('warehouse', 'dm', 'me'),
            allowNull: true
        },
        quantity: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
    {
        modelName: 'MaterialRequestAction',
        tableName: 'material_request_action',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Employee.hasMany(MaterialRequestAction, {
    foreignKey: 'action_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequestAction.belongsTo(Employee, {
    foreignKey: 'action_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequest.hasMany(MaterialRequestAction, {
    foreignKey: 'material_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialRequestAction.belongsTo(MaterialRequest, {
    foreignKey: 'material_request_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
export default MaterialRequestAction

