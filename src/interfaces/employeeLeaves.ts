import { Optional } from 'sequelize'

interface IEmployeeLeavesAttributes {
    id: number
    employee_code: string
    date: Date | string
    leave_type: number
}

interface IEmployeeLeavesInput extends Optional<IEmployeeLeavesAttributes, 'id'> {}
interface IEmployeeLeavesOutput extends Required<IEmployeeLeavesAttributes> {}

export { IEmployeeLeavesAttributes, IEmployeeLeavesInput, IEmployeeLeavesOutput }

