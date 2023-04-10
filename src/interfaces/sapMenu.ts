import { Optional } from 'sequelize'

interface ISapMenuAttributes {
    sap_menu_code: string
    sap_menu_desc: string
    sap_menu_name: string
    price: number
    synced_ts: Date
    createdAt?: Date
    updatedAt?: Date
}

interface ISapMenuInput extends Optional<ISapMenuAttributes, 'sap_menu_code'> {}

interface ISapMenuOutput extends Required<ISapMenuAttributes> {}

export { ISapMenuAttributes, ISapMenuInput, ISapMenuOutput }

