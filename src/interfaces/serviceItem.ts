import { Optional } from 'sequelize'

interface IServiceItemAttributes {
    id: number
    service_code: string
    material_code: string
    qty: number
}

interface IServiceItemInput extends Optional<IServiceItemAttributes, 'id'> {}
interface IServiceItemOutput extends Required<IServiceItemAttributes> {}

export { IServiceItemAttributes, IServiceItemInput, IServiceItemOutput }

