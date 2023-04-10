import { Optional } from 'sequelize'

interface IQuoteItemAttributes {
    id: number
    quote_id: number
    service_id: number
    qty: number
    service_name: string
    service_desc: string
    price: number
}

interface IQuoteItemInput extends Optional<IQuoteItemAttributes, 'id'> {}
interface IQuoteItemOutput extends Required<IQuoteItemAttributes> {}

export { IQuoteItemAttributes, IQuoteItemInput, IQuoteItemOutput }

