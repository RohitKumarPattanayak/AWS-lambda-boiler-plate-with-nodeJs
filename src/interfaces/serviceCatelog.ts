import { Optional } from 'sequelize'

interface IServiceCatelogAttributes {
    id: number
    description: string
    price: number
    display_order: number
    service_category_code: string
    service_name: string
    category_code: number
    unit_description: string
    createdAt?: Date
    updatedAt?: Date
}

interface IServiceCatelogInput extends Optional<IServiceCatelogAttributes, 'id'> {}
interface IServiceCatelogOutput extends Required<IServiceCatelogAttributes> {}

export { IServiceCatelogAttributes, IServiceCatelogInput, IServiceCatelogOutput }

