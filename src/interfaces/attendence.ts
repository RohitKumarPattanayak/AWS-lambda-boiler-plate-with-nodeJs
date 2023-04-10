import { Optional } from 'sequelize'

interface IAttendenceAttributes {
    id: number
    employee_code: string
    in_date_time: Date
    out_date_time: Date
    in_photo_url: string
    in_comment: string
    out_comment: string
    out_photo_url: string
    job_code: string
    in_modified_employee_code: string
    out_modified_employee_code: string
}

interface IAttendenceInput extends Optional<IAttendenceAttributes, 'id'> {}
interface IAttendenceOutput extends Required<IAttendenceAttributes> {}

export { IAttendenceAttributes, IAttendenceInput, IAttendenceOutput }

