import { DataTypes, Model, DateOnlyDataType } from 'sequelize'
import { IJobAllocationAttributes } from '../interfaces/jobAllocation'
import { connection } from '../config/mysql'
import { Employee, Job } from '../models'

class JobAllocation extends Model<IJobAllocationAttributes> implements IJobAllocationAttributes {
    public id!: number
    public job_code!: string
    public employee_code!: string
    public temp_alloted: number
    public temp_start_date: DateOnlyDataType
    public temp_end_date: DateOnlyDataType

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

JobAllocation.init(
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
        employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        temp_alloted: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        temp_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        temp_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    },
    {
        modelName: 'JobAllocation',
        tableName: 'job_allocation',
        timestamps: true,
        indexes: [
            {
                name: 'job_employee_code',
                unique: true,
                fields: ['job_code', 'employee_code']
            }
        ],
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Employee.hasOne(JobAllocation, {
    foreignKey: 'employee_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
})

JobAllocation.belongsTo(Employee, {
    foreignKey: 'employee_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
})

Job.hasMany(JobAllocation, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
})

JobAllocation.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onUpdate: 'cascade',
    onDelete: 'cascade'
})

export default JobAllocation

