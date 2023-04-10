import { Optional } from 'sequelize'

interface IRoleAttributes {
    role_code: string
    name: string
    staff_type: number
    createdAt?: Date
    updatedAt?: Date
}

interface IRoleInput extends Optional<IRoleAttributes, 'role_code'> {}
interface IRoleOutput extends Required<IRoleAttributes> {}

export { IRoleAttributes, IRoleInput, IRoleOutput }

