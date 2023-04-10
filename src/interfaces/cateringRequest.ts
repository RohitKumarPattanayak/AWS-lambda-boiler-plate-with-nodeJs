import { Optional } from 'sequelize'

interface ICateringRequestsAttributes {
    id: number
    type: string
    job_code: string
    date: string
    requested_by_employee_code: string
    created_by: string
    CateringMenus?: object
}

interface ICateringRequestsInput extends Optional<ICateringRequestsAttributes, 'id'> {}
interface ICateringRequestsOutput extends Required<ICateringRequestsAttributes> {}

export { ICateringRequestsAttributes, ICateringRequestsInput, ICateringRequestsOutput }

