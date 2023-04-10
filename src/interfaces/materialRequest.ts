import { Optional } from 'sequelize'

interface IMaterialRequestAttributes {
    id: number
    warehouse_code: string
    requested_by_employee_code: string
    comment: string
    synced_ts: Date
    status_code: string
    MaterialRequestItems?: object
}

interface IMaterialRequestInput extends Optional<IMaterialRequestAttributes, 'id'> {}
interface IMaterialRequestOutput extends Required<IMaterialRequestAttributes> {}

export { IMaterialRequestAttributes, IMaterialRequestInput, IMaterialRequestOutput }

