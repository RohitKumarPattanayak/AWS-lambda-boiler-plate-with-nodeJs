import { DataTypes, Model } from 'sequelize'
import { IEquipmentUsageAttributes } from '../interfaces/equipmentUsage'
import { connection } from '../config/mysql'
import Employee from './employee'
import Job from './job'
import MaterialMaster from './materialMaster'

class EquipmentUsage extends Model<IEquipmentUsageAttributes> implements IEquipmentUsageAttributes {
    public id!: number
    public job_code: string
    public material_code: string
    public supervisor_emp_code: string
    public synced_ts: Date
    public hrs: number
    public mins: number
    public date: Date

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

EquipmentUsage.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        material_code: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        supervisor_emp_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hrs: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '00'
        },
        mins: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: '00'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        modelName: 'EquipmentUsage',
        tableName: 'equipment_usage',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Employee.hasMany(EquipmentUsage, {
    foreignKey: 'supervisor_emp_code',
    sourceKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

EquipmentUsage.belongsTo(Employee, {
    foreignKey: 'supervisor_emp_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Job.hasMany(EquipmentUsage, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

EquipmentUsage.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

MaterialMaster.hasMany(EquipmentUsage, {
    foreignKey: 'material_code',
    sourceKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

EquipmentUsage.belongsTo(MaterialMaster, {
    foreignKey: 'material_code',
    targetKey: 'material_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default EquipmentUsage

