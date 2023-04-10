import { Optional } from 'sequelize'

interface IAdminUsersAttributes {
    id: number
    username: string
    password: string
    is_active: number
    createdAt?: Date
    updatedAt?: Date
}

interface IAdminUsersInput extends Optional<IAdminUsersAttributes, 'id'> {}
interface IAdminUsersOutput extends Required<IAdminUsersAttributes> {}

export { IAdminUsersAttributes, IAdminUsersInput, IAdminUsersOutput }

