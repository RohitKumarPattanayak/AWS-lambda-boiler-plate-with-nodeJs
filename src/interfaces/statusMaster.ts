import { Optional } from 'sequelize'

interface ISiteAttributes {
    id: number
    status_code: string
    desc: string
    is_active: number
    type: string
    created_at?: Date
    updated_at?: Date
}

interface ISiteInput extends Optional<ISiteAttributes, 'id'> {}

interface ISiteOutput extends Required<ISiteAttributes> {}

export { ISiteAttributes, ISiteInput, ISiteOutput }

