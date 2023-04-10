import { DataTypes, Model} from 'sequelize'
import { IAttendenceAttributes, IAttendenceInput } from '../interfaces/attendence'
import { connection } from '../config/mysql'
import Employee from './employee'
import Job from './job'

class Attendence extends Model<IAttendenceAttributes> implements IAttendenceAttributes {
    public id: number
    public employee_code: string
    public in_date_time: Date
    public out_date_time: Date
    public in_photo_url: string
    public in_comment: string
    public out_comment: string
    public out_photo_url: string
    public job_code: string
    public in_modified_employee_code!: string
    public out_modified_employee_code!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    timePlayed: number

    static associate(models: any) {}
}

Attendence.init(
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
        in_date_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        out_date_time: {
            type: DataTypes.DATE,
            allowNull: true
        },

        in_photo_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        in_comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        out_comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        out_photo_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        job_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        in_modified_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        out_modified_employee_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    },
    {
        modelName: 'Attendence',
        tableName: 'attendence',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Job.hasMany(Attendence, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Attendence.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Attendence, {
    foreignKey: 'employee_code',
    as: 'Attendence',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Attendence.belongsTo(Employee, {
    foreignKey: 'employee_code',
    as: 'Attendence',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Attendence, {
    foreignKey: 'in_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Attendence.belongsTo(Employee, {
    foreignKey: 'in_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Attendence, {
    foreignKey: 'out_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Attendence.belongsTo(Employee, {
    foreignKey: 'out_modified_employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Employee.hasMany(Attendence, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Attendence.belongsTo(Employee, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
export default Attendence

