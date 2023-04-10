import { Optional } from 'sequelize'

interface IQuoteLogAttributes {
    id: number
    quote_id: number
    date: Date
    supervisor_code: string
    old_quote_obj: string
    new_quote_obj: string
}

interface IQuoteLogInput extends Optional<IQuoteLogAttributes, 'id'> {}
interface IQuoteLogOutput extends Required<IQuoteLogAttributes> {}

export { IQuoteLogAttributes, IQuoteLogInput, IQuoteLogOutput }

