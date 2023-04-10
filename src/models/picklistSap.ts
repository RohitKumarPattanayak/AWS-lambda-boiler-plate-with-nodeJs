import { DataTypes, Model } from 'sequelize'
import { IPicklistSapAttributes } from '../interfaces/picklistSap'
import { connection } from '../config/mysql'
import StatusMaster from './statusMaster'
import Job from './job'
import SapMenu from './sapMenu'

class PicklistSap extends Model<IPicklistSapAttributes> implements IPicklistSapAttributes {
    public id!: number
    public job_code!: string
    public menu_group_code: string
    public item_code: string
    public qty: number
    public unit_descriptor: string
    public synced_ts: Date
    public status_code: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

PicklistSap.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        menu_group_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        item_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        qty: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        unit_descriptor: {
            type: DataTypes.STRING(20),
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
        modelName: 'PicklistSap',
        tableName: 'picklist_sap',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Job.hasMany(PicklistSap, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

PicklistSap.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

PicklistSap.belongsTo(StatusMaster, {
    foreignKey: 'status_code'
})

SapMenu.hasMany(PicklistSap, {
    foreignKey: 'menu_group_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

PicklistSap.belongsTo(SapMenu, {
    foreignKey: 'menu_group_code',
    targetKey: 'sap_menu_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
export default PicklistSap

