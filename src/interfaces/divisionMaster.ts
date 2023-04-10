import { Optional } from 'sequelize'

interface IDivisionMasterAttributes {
    id: number
    division_code: string
    name: string
    icon_filename: string
    is_active: number
    is_catering: number
    updatedAt?: Date
    createdAt?: Date
}

interface IDivisionMasterInput extends Optional<IDivisionMasterAttributes, 'id'> {}
interface IDivisionMasterOutput extends Required<IDivisionMasterAttributes> {}

export { IDivisionMasterAttributes, IDivisionMasterInput, IDivisionMasterOutput }

