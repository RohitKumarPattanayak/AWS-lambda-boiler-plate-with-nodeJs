import { Optional } from 'sequelize'

interface ICateringMenuGroupAttributes {
    id: number
    menu_group_code: string
    sap_menu_code: string
}

interface ICateringMenuGroupInput extends Optional<ICateringMenuGroupAttributes, 'id'> {}
interface ICateringMenuGroupOutput extends Required<ICateringMenuGroupAttributes> {}

export { ICateringMenuGroupAttributes, ICateringMenuGroupInput, ICateringMenuGroupOutput }

