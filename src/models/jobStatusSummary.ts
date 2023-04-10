import { DataTypes, Model } from 'sequelize'
import { IjobStatusSummaryAttributes } from '../interfaces/jobStatusSummary'
import { connection } from '../config/mysql'

class JobStatusSummary extends Model<IjobStatusSummaryAttributes> implements IjobStatusSummaryAttributes {
    public id!: number
    public supervisor_emp_code!: number
    public status_code!: number
    public service_id!: number
    public job_code!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

JobStatusSummary.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        supervisor_emp_code: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        status_code: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        service_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        job_code: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        modelName: 'JobStatusSummary',
        tableName: 'job_status_summary',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default JobStatusSummary

