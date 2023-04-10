import { DataTypes, Model } from 'sequelize'
import { ICateringRequestsAttributes } from '../interfaces/cateringRequest'
import { connection } from '../config/mysql'
import Job from './job'
import Employee from './employee'

class CateringRequest extends Model<ICateringRequestsAttributes> implements ICateringRequestsAttributes {
    public id!: number
    public type: string
    public job_code!: string
    public date: string
    public requested_by_employee_code!: string
    public created_by: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

CateringRequest.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM('internal', 'external'),
            allowNull: false
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        requested_by_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        created_by: {
            type: DataTypes.ENUM('sap', 'mobile'),
            allowNull: false
        }
    },
    {
        modelName: 'CateringRequest',
        tableName: 'catering_request',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Job.hasMany(CateringRequest, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

CateringRequest.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(CateringRequest, {
    foreignKey: 'requested_by_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

CateringRequest.belongsTo(Employee, {
    foreignKey: 'requested_by_employee_code',
    targetKey: 'sap_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default CateringRequest

