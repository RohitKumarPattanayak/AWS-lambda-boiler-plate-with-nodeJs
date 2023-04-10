import { Optional } from 'sequelize'

interface ISiteAttributes {
    site_code: string
    name: string
}

interface ISiteInput extends Optional<ISiteAttributes, 'site_code'> {}

interface ISiteOutput extends Required<ISiteAttributes> {}

export { ISiteAttributes, ISiteInput, ISiteOutput }

