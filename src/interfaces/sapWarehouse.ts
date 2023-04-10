import { Optional } from 'sequelize'

interface ISapWarehouseAttributes {
    sap_warehouse_code: string
    sap_warehouse_name: string
    synced_ts: Date
}

interface ISapWarehouseInput extends Optional<ISapWarehouseAttributes, 'sap_warehouse_code'> {}
interface ISapWarehouseOutput extends Required<ISapWarehouseAttributes> {}

export { ISapWarehouseAttributes, ISapWarehouseInput, ISapWarehouseOutput }

