import { Optional } from 'sequelize'

interface ICateringMenuAttributes {
    id: number
    catering_request_id: number
    sap_menu_code: string
    pax: string
    createdAt?: Date
    updatedAt?: Date
}

interface ICateringMenuInput extends Optional<ICateringMenuAttributes, 'id'> {}
interface ICateringMenuOutput extends Required<ICateringMenuAttributes> {}

export { ICateringMenuAttributes, ICateringMenuInput, ICateringMenuOutput }

