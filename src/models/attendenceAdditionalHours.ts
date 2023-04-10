import { DataTypes, Model } from 'sequelize'
import { IAttendenceAdditionalHoursAttributes } from '../interfaces/attendenceAdditionalHours'
import { connection } from '../config/mysql'
import Job from './job'
import Employee from './employee'

class AttendenceAdditionalHours extends Model<IAttendenceAdditionalHoursAttributes> implements IAttendenceAdditionalHoursAttributes {
    public id!: number
    public employee_code!: number
    public date!: Date
    public hours!: string
    public comments: string
    public job_code!: number
    public modified_employee_code!: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

AttendenceAdditionalHours.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hours: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: true
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        modified_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    },
    {
        modelName: 'AttendenceAdditionalHours',
        tableName: 'attendence_additional_hours',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Job.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

AttendenceAdditionalHours.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

AttendenceAdditionalHours.belongsTo(Employee, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

AttendenceAdditionalHours.belongsTo(Employee, {
    foreignKey: 'modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(AttendenceAdditionalHours, {
    foreignKey: 'employee_code',
    sourceKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

AttendenceAdditionalHours.belongsTo(Employee, {
    foreignKey: 'employee_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default AttendenceAdditionalHours

