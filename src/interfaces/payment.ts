import { Optional } from 'sequelize'

interface IPaymentAttributes {
    id: number
    job_code: string
    payment_mode: string
    amount: number
    image_url: string
    collected_employee_code: string
    synced_ts: Date
    customer_id: number
    cheque_sap_handover_status: number
    cheque_bounce: number
    EmployeeCashWallets?: object
}

interface IPaymentInput extends Optional<IPaymentAttributes, 'id'> {}
interface IPaymentOutput extends Required<IPaymentAttributes> {}

export { IPaymentAttributes, IPaymentInput, IPaymentOutput }

