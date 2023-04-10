import { Optional } from 'sequelize'

interface IQuoteLineItemAttributes {
    id: number
    quote_item_id: number
    material_code: string
    qty: number
    price: number
    unit_descriptor: string
}

interface IQuoteLineItemInput extends Optional<IQuoteLineItemAttributes, 'id'> {}
interface IQuoteLineItemOutput extends Required<IQuoteLineItemAttributes> {}

export { IQuoteLineItemAttributes, IQuoteLineItemInput, IQuoteLineItemOutput }

