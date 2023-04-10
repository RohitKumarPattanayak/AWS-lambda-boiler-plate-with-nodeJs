import { Optional } from 'sequelize'

interface IMaterialRequestItemAttributes {
    id: number
    request_id: number
    material_code: string
    requested_qty: number
    delivered_qty: number
    approved_qty: number
    rejected_qty: number
}

interface IMaterialRequestItemInput extends Optional<IMaterialRequestItemAttributes, 'id'> {}
interface IMaterialRequestItemOutput extends Required<IMaterialRequestItemAttributes> {}

export { IMaterialRequestItemAttributes, IMaterialRequestItemInput, IMaterialRequestItemOutput }

