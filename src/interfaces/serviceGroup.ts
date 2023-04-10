import { Optional } from 'sequelize'

interface IServiceGroupAttributes {
    id: number
    service_group_code: number
    name: string
    is_active: number
    createdAt?: Date
    updatedAt?: Date
}

interface IServiceGroupInput extends Optional<IServiceGroupAttributes, 'id'> {}
interface IServiceGroupOutput extends Required<IServiceGroupAttributes> {}

export { IServiceGroupAttributes, IServiceGroupInput, IServiceGroupOutput }

