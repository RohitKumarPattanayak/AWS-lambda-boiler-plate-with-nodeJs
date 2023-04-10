import { DataTypes, Model } from 'sequelize'
import { IMaterialLedgerAttributes } from '../interfaces/materialLedger'
import { connection } from '../config/mysql'
import Employee from './employee'
import Job from './job'
import MaterialMaster from './materialMaster'
import EmpMaterialBin from './empMaterialBin'
import MaterialRequest from './materialRequest'

class MaterialLedger extends Model<IMaterialLedgerAttributes> implements IMaterialLedgerAttributes {
    public id!: number
    public job_code!: string
    public material_code!: string
    public quantity!: number
    public synced_ts: Date
    public supervisor_emp_code: string
    public type: string
    public material_request_id: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

MaterialLedger.init(
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
            type: DataTypes.STRING(20),
            allowNull: false
        },
        quantity: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        synced_ts: {
            type: DataTypes.DATE,
            allowNull: true
        },
        supervisor_emp_code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('received', 'used', 'return'),
            allowNull: true
        },
        material_request_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    },
    {
        modelName: 'MaterialLedger',
        tableName: 'material_ledger',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)
Employee.hasMany(MaterialLedger, {
    foreignKey: 'supervisor_emp_code',
    sourceKey: 'sap_employee_code'
})
MaterialLedger.belongsTo(Employee, {
    foreignKey: 'supervisor_emp_code',
    targetKey: 'sap_employee_code'
})

Job.hasMany(MaterialLedger, {
    foreignKey: 'job_code',
    sourceKey: 'sap_job_code'
})
MaterialLedger.belongsTo(Job, {
    foreignKey: 'job_code',
    targetKey: 'sap_job_code'
})

MaterialMaster.hasOne(MaterialLedger, {
    foreignKey: 'material_code',
    sourceKey: 'material_code'
})
MaterialLedger.belongsTo(MaterialMaster, {
    foreignKey: 'material_code',
    targetKey: 'material_code'
})

//UPCOMING: associations with materialRequest
// MaterialRequest.hasMany(MaterialLedger, {
//     foreignKey: 'material_request_id',
//     onDelete: 'cascade',
//     onUpdate: 'cascade'
// })

// MaterialLedger.belongsTo(MaterialRequest, { foreignKey: 'material_request_id', onDelete: 'cascade', onUpdate: 'cascade' })

export default MaterialLedger

