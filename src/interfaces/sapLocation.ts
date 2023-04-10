import { Optional } from 'sequelize'

interface ISapLocationAttributes {
    id: number
    site_code: string
    latitude: number
    longitude: number

    createdAt?: Date
    updatedAt?: Date
}

interface ISapLocationInput extends Optional<ISapLocationAttributes, 'id'> {}

interface ISapLocationOutput extends Required<ISapLocationAttributes> {}

export { ISapLocationAttributes, ISapLocationInput, ISapLocationOutput }

