import { Optional } from 'sequelize'

interface IDailyReportAttributes {
    id: number
    last_report_submitted: string
    job_code: string
    submitted_by_employee_code: string
    session_start_datetime: string
    session_end_datetime: string
    date: string
}

interface IDailyReportInput extends Optional<IDailyReportAttributes, 'id'> {}
interface IDailyReportOutput extends Required<IDailyReportAttributes> {}

export { IDailyReportAttributes, IDailyReportInput, IDailyReportOutput }

