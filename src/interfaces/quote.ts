import { Optional } from 'sequelize'

interface IQuoteAttributes {
    id: number
    customer_id: string
    sap_quote_id: string
    start_date: Date
    status_code: string
    total: number
    vat: number
    payment_on_credit: number
    margin: number
    discount: number
    job_duration: number
    site_visit_require: number
    created_supervisor_id: string
    assigned_supervisor_id: string
    assigned_by_id: string
    payment_mode: string
    paid: number
    copy_of_quote: string
    QuoteItems?: object
    QuoteLogs?: object
    payment_terms_code: string
    init_comments: string
    site_visited_status?: number
}

interface IQuoteInput extends Optional<IQuoteAttributes, 'id'> {}
interface IQuoteOutput extends Required<IQuoteAttributes> {}

export { IQuoteAttributes, IQuoteInput, IQuoteOutput }

