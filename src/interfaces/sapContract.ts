import { Optional } from 'sequelize'

interface ISiteAttributes {
    // id: number
    contract_code: string
    name: string
    project_id: string
    createdAt?: Date
    updatedAt?: Date
}

interface ISiteInput extends Optional<ISiteAttributes, 'contract_code'> {}

interface ISiteOutput extends Required<ISiteAttributes> {}

export { ISiteAttributes, ISiteInput, ISiteOutput }

