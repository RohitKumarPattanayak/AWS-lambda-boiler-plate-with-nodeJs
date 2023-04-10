import { Optional } from 'sequelize'

interface ISpcFormAttributes {
    id: number
    job_code: string
    spc_form_url: string
}

interface ISpcFormInput extends Optional<ISpcFormAttributes, 'id'> {}
interface ISpcFormOutput extends Required<ISpcFormAttributes> {}

export { ISpcFormAttributes, ISpcFormInput, ISpcFormOutput }

