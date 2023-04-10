import { Optional } from 'sequelize'

interface IQuoteInitChecklistAttributes {
    id: number
    quote_id: number
    checklist_id: number
    value: number
}

interface IQuoteInitChecklistInput extends Optional<IQuoteInitChecklistAttributes, 'id'> {}
interface IQuoteInitChecklistOutput extends Required<IQuoteInitChecklistAttributes> {}

export { IQuoteInitChecklistAttributes, IQuoteInitChecklistInput, IQuoteInitChecklistOutput }

