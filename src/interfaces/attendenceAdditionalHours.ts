import { Optional } from 'sequelize'

interface IAttendenceAdditionalHoursAttributes {
    id: number
    employee_code: number
    date: Date
    hours: string
    comments: string
    job_code: number
    modified_employee_code: string
}

interface IAttendenceAdditionalHoursInput extends Optional<IAttendenceAdditionalHoursAttributes, 'id'> {}
interface IAttendenceAdditionalHoursOutput extends Required<IAttendenceAdditionalHoursAttributes> {}

export { IAttendenceAdditionalHoursAttributes, IAttendenceAdditionalHoursInput, IAttendenceAdditionalHoursOutput }

