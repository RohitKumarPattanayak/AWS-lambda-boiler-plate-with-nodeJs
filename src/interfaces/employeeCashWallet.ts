import { Optional } from 'sequelize'

interface IEmployeeCashWalletAttributes {
    id: number
    employee_code: string
    cr_amount: number
    dr_amount: number
    payment_id: number
    balance: number
    synced_ts: Date
    notes: string
    sap_ledger_code: number
}

interface IEmployeeCashWalletInput extends Optional<IEmployeeCashWalletAttributes, 'id'> {}
interface IEmployeeCashWalletOutput extends Required<IEmployeeCashWalletAttributes> {}

export { IEmployeeCashWalletAttributes, IEmployeeCashWalletInput, IEmployeeCashWalletOutput }

