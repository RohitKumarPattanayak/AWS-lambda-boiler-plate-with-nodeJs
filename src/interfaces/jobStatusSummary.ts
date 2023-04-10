import { Optional } from 'sequelize'

interface IjobStatusSummaryAttributes {
    id: number
    supervisor_emp_code: number
    status_code: number
    service_id: number
    job_code: number
}

interface IjobStatusSummaryInput extends Optional<IjobStatusSummaryAttributes, 'id'> {}
interface IjobStatusSummaryOutput extends Required<IjobStatusSummaryAttributes> {}

export { IjobStatusSummaryAttributes, IjobStatusSummaryInput, IjobStatusSummaryOutput }

