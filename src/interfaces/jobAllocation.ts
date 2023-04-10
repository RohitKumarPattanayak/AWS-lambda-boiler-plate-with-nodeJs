import { Optional, DateOnlyDataType } from 'sequelize'

interface IJobAllocationAttributes {
    id: number
    job_code: string
    employee_code: string
    temp_alloted: number
    temp_start_date: DateOnlyDataType
    temp_end_date: DateOnlyDataType
}

interface IJobAllocationInput extends Optional<IJobAllocationAttributes, 'id'> {}
interface IJobAllocationOutput extends Required<IJobAllocationAttributes> {}

export { IJobAllocationAttributes, IJobAllocationInput, IJobAllocationOutput }

