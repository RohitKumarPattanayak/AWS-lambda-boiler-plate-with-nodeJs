import { Optional } from 'sequelize'

interface IQuoteInitImagesAttributes {
    id: number
    quote_id: number
    image_url: string
    type: Enumerator
}

interface IQuoteInitImagesInput extends Optional<IQuoteInitImagesAttributes, 'id'> {}
interface IQuoteInitImagesOutput extends Required<IQuoteInitImagesAttributes> {}

export { IQuoteInitImagesAttributes, IQuoteInitImagesInput, IQuoteInitImagesOutput }

