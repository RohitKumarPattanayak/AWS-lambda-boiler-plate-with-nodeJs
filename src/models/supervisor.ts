import { DataTypes, DateOnlyDataType, Model } from 'sequelize'
import { ISupervisorAttributes } from '../interfaces/supervisor'
import { connection } from '../config/mysql'

import { Job, Employee } from '../models'

class Supervisor extends Model<ISupervisorAttributes> implements ISupervisorAttributes {
    public id!: number
    public job_code!: string
    public employee_code!: string
    public temp_alloted!: number
    public temp_start_date!: DateOnlyDataType
    public temp_end_date!: DateOnlyDataType
    public upload_essential!: number
    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date
}

Supervisor.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            references: {
                model: Job,
                key: 'sap_job_code'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
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
        },
        upload_essential: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        modelName: 'Supervisor',
        tableName: 'supervisor',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection,
        underscored: true
    }
)
Job.hasOne(Supervisor, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code'
})

Supervisor.belongsTo(Job, {
    onDelete: 'cascade',
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    hooks: true
})

Employee.hasOne(Supervisor, {
    foreignKey: 'employee_code',
    sourceKey: 'sap_employee_code'
})

Supervisor.belongsTo(Employee, {
    foreignKey: 'employee_code'
})

export default Supervisor

