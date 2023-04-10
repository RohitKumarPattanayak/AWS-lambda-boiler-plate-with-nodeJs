import { Optional } from 'sequelize'

interface IMaterialLedgerAttributes {
    id: number
    job_code: string
    material_code: string
    quantity: number
    synced_ts: Date
    supervisor_emp_code: string
    type: string
    material_request_id: number
}

interface IMaterialLedgerInput extends Optional<IMaterialLedgerAttributes, 'id'> {}
interface IMaterialLedgerOutput extends Required<IMaterialLedgerAttributes> {}

export { IMaterialLedgerAttributes, IMaterialLedgerInput, IMaterialLedgerOutput }

