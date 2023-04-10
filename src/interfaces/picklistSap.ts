import { Optional } from 'sequelize'

interface IPicklistSapAttributes {
    id: number
    job_code: string
    menu_group_code: string
    item_code: string
    qty: number
    unit_descriptor: string
    synced_ts: Date
    status_code: string
}

interface IPicklistSapInput extends Optional<IPicklistSapAttributes, 'id'> {}
interface IPicklistSapOutput extends Required<IPicklistSapAttributes> {}

export { IPicklistSapAttributes, IPicklistSapInput, IPicklistSapOutput }

