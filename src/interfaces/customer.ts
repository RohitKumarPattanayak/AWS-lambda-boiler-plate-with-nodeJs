import { Optional } from 'sequelize'

interface ICustomerAttributes {
    id: number
    customer_code: string
    name: string
    mobile_number: string
    vat: number
    is_vat_applicable: number
    email: string
    address_line_1: string
    address_line_2: string
    city: string
    zipcode: number
    is_company: number
    total_outstanding_amount: number
    payment_terms_code: string
    type: string
    service_group: number
    createdAt?: Date
    updatedAt?: Date
}

interface ICustomerInput extends Optional<ICustomerAttributes, 'id'> {}
interface ICustomerOutput extends Required<ICustomerAttributes> {}

export { ICustomerAttributes, ICustomerInput, ICustomerOutput }

