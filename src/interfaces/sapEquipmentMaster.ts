import { Optional } from 'sequelize'

interface IEquipmentMasterAttributes {
    equipment_code: string
    name: string
    is_active: number
}

interface IEquipmentMasterInput extends Optional<IEquipmentMasterAttributes, 'equipment_code'> {}
interface IEquipmentMasterOutput extends Required<IEquipmentMasterAttributes> {}

export { IEquipmentMasterAttributes, IEquipmentMasterInput, IEquipmentMasterOutput }

