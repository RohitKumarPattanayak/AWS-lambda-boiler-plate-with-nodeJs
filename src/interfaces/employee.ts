import { Optional } from 'sequelize'

interface IEmployeeAttributes {
    sap_employee_code: string
    first_name: string
    last_name?: string
    email?: string
    phone: number
    password: string
    role_code: string
    is_active?: number
    photo_url?: string
    last_login_ts?: Date
    fcm?: string
    has_app_access?: number
    daily_contract_hrs?: number
    emp_type?: number
    sex?: string
    country?: string
    key?: string
    updatedAt?: Date
    createdAt?: Date
}

interface IEmployeeInput extends Optional<IEmployeeAttributes, 'sap_employee_code'> {}
interface IEmployeeOutput extends Required<IEmployeeAttributes> {}

export { IEmployeeAttributes, IEmployeeInput, IEmployeeOutput }

