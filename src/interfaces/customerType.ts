import { Optional } from 'sequelize'

interface ICustomerAttributes {
    code: string
    type: string
}

interface ICustomerTypeInput extends Optional<ICustomerAttributes, 'code'> {}
interface ICustomerTypeOutput extends Required<ICustomerAttributes> {}

export { ICustomerAttributes, ICustomerTypeInput, ICustomerTypeOutput }

