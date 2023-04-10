import { Optional } from 'sequelize'

interface IServiceCatalogAttributes {
    id: number
    description: string
    price: number
    service_code: string
    display_order: number
    division_id: string
    service_name: string
    unit_descriptor: string
    service_type: string
    createdAt?: Date
    updatedAt?: Date
}

interface IServiceCatalogInput extends Optional<IServiceCatalogAttributes, 'id'> {}
interface IServiceCatalogOutput extends Required<IServiceCatalogAttributes> {}

export { IServiceCatalogAttributes, IServiceCatalogInput, IServiceCatalogOutput }

