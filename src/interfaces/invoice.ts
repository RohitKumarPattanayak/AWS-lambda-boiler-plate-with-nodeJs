import { Optional } from 'sequelize'

interface IInvoiceAttributes {
    id: number
    job_code: string
    status: string
    sap_invoice_date: Date
    sap_invoice_code: string
    sap_invoice_due_date: Date
    sap_invoice_amount: number
    discount: number
    vat: number
    due_amount: number
    pre_payment: number
}

interface IInvoiceInput extends Optional<IInvoiceAttributes, 'id'> {}
interface IInvoiceOutput extends Required<IInvoiceAttributes> {}

export { IInvoiceAttributes, IInvoiceInput, IInvoiceOutput }

