import { Optional } from 'sequelize'

interface IMaterialMasterAttributes {
    material_code: string
    material_name: string
    is_active: number
    unit_descriptor: string
    division_id: number
    price: number
    image_url: string
    type: string
    created_at?: Date
    updated_at?: Date
}

interface IMaterialMasterInput extends Optional<IMaterialMasterAttributes, 'material_code'> {}
interface IMaterialMasterOutput extends Required<IMaterialMasterAttributes> {}

export { IMaterialMasterAttributes, IMaterialMasterInput, IMaterialMasterOutput }

