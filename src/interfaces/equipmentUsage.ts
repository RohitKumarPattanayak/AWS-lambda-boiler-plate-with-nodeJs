import { Optional } from 'sequelize'

interface IEquipmentUsageAttributes {
    id: number
    job_code: string
    material_code: string
    supervisor_emp_code: string
    synced_ts: Date
    hrs: number
    mins: number
    date: Date
}

interface IEquipmentUsageInput extends Optional<IEquipmentUsageAttributes, 'id'> {}
interface IEquipmentUsageOutput extends Required<IEquipmentUsageAttributes> {}

export { IEquipmentUsageAttributes, IEquipmentUsageInput, IEquipmentUsageOutput }

