import { Optional } from 'sequelize'

interface IEmpMaterialBinAttributes {
    id: number
    employee_code: string
    material_code: string
    current_qty: number
}

interface IEmpMaterialBinInput extends Optional<IEmpMaterialBinAttributes, 'id'> {}
interface IEmpMaterialBinOutput extends Required<IEmpMaterialBinAttributes> {}

export { IEmpMaterialBinAttributes, IEmpMaterialBinInput, IEmpMaterialBinOutput }

