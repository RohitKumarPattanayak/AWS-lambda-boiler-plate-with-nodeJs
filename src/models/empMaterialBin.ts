import { DataTypes, Model } from 'sequelize'
import { IEmpMaterialBinAttributes } from '../interfaces/empMaterialBin'
import { connection } from '../config/mysql'
import Employee from './employee'
import MaterialMaster from './materialMaster'

class EmpMaterialBin extends Model<IEmpMaterialBinAttributes> implements IEmpMaterialBinAttributes {
    public id!: number
    public employee_code!: string
    public material_code!: string
    public current_qty!: number

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

EmpMaterialBin.init(
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
        },
        material_code: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        current_qty: {
            type: DataTypes.DECIMAL(6, 2).UNSIGNED,
            allowNull: false
        }
    },
    {
        modelName: 'EmpMaterialBin',
        tableName: 'emp_material_bin',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

Employee.hasOne(EmpMaterialBin, {
    foreignKey: 'employee_code',
    sourceKey: 'sap_employee_code'
})
EmpMaterialBin.belongsTo(Employee, {
    foreignKey: 'employee_code',
    targetKey: 'sap_employee_code'
})
MaterialMaster.hasOne(EmpMaterialBin, {
    foreignKey: 'material_code',
    sourceKey: 'material_code'
})
EmpMaterialBin.belongsTo(MaterialMaster, {
    foreignKey: 'material_code',
    targetKey: 'material_code'
})

export default EmpMaterialBin

