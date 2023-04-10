import { DateOnlyDataType, Optional } from 'sequelize'

interface ISupervisorAttributes {
    id: number
    job_code: string
    employee_code: string
    temp_alloted: number
    temp_start_date: DateOnlyDataType
    temp_end_date: DateOnlyDataType
    upload_essential: number
}

interface ISupervisorInput extends Optional<ISupervisorAttributes, 'id'> {}
interface ISupervisorOutput extends Required<ISupervisorAttributes> {}

export { ISupervisorAttributes, ISupervisorInput, ISupervisorOutput }

