import { DataTypes, Model } from 'sequelize'
import { IDailyReportAttributes } from '../interfaces/dailyReport'
import { connection } from '../config/mysql'
import Job from './job'
import Employee from './employee'

class DailyReport extends Model<IDailyReportAttributes> implements IDailyReportAttributes {
    public id!: number
    public last_report_submitted!: string
    public job_code!: string
    public submitted_by_employee_code!: string
    public session_start_datetime: string
    public session_end_datetime: string
    public date: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {
        DailyReport.hasMany(models.Supervisor)
    }
}

DailyReport.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        last_report_submitted: {
            type: DataTypes.DATE,
            allowNull: true
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        submitted_by_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        session_start_datetime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        session_end_datetime: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        modelName: 'DailyReport',
        tableName: 'daily_report',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)

Job.hasMany(DailyReport, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

DailyReport.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
//NEEDED ASSOCIATION:
Employee.hasMany(DailyReport, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'submitted_by_employee_code'
})
DailyReport.belongsTo(Employee, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'submitted_by_employee_code'
})
export default DailyReport

