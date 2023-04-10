import { Optional } from 'sequelize'

interface IMaterialRequestActionAttributes {
    id: number
    material_request_id: number
    action: string
    action_employee_code: string
    comment: string
    action_role: string
    quantity: number
}

interface IMaterialRequestActionInput extends Optional<IMaterialRequestActionAttributes, 'id'> {}
interface IMaterialRequestActionOutput extends Required<IMaterialRequestActionAttributes> {}

export { IMaterialRequestActionAttributes, IMaterialRequestActionInput, IMaterialRequestActionOutput }

