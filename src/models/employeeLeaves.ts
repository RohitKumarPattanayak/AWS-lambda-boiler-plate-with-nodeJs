import { DataTypes, Model } from 'sequelize'
import { IEmployeeLeavesAttributes } from '../interfaces/employeeLeaves'
import { connection } from '../config/mysql'
import { Employee } from '../models'

class EmployeeLeaves extends Model<IEmployeeLeavesAttributes> implements IEmployeeLeavesAttributes {
    public id!: number
    public employee_code!: string
    public date!: Date
    public leave_type: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

EmployeeLeaves.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        employee_code: {
            type: DataTypes.STRING(20),
            allowNull: false
            // references: {
            //     model: Employee,
            //     key: 'sap_employee_code'
            // },
            // onDelete: 'cascade',
            // onUpdate: 'cascade'
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        leave_type: {
            type: DataTypes.ENUM('leave', 'week off'),
            allowNull: false,
            defaultValue: 'leave'
        }
    },
    {
        modelName: 'EmployeeLeaves',
        tableName: 'employee_leaves',
        timestamps: true,
        indexes: [
            {
                name: 'tbl_employee_leaves_employee_code_date',
                unique: true,
                fields: ['employee_code', 'date']
            }
        ],
        comment: 'Table to track employee leaves',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Employee.hasMany(EmployeeLeaves, {
    foreignKey: 'employee_code',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

EmployeeLeaves.belongsTo(Employee, {
    foreignKey: 'employee_code'
})

export default EmployeeLeaves

