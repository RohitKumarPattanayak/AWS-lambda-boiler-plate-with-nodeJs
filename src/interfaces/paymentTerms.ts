import { Optional } from 'sequelize'

interface IPaymentTermsAttributes {
    code: string
    term: string
    is_accessible: number
}

interface IPaymentTermsInput extends Optional<IPaymentTermsAttributes, 'code'> {}
interface IPaymentTermsOutput extends Required<IPaymentTermsAttributes> {}

export { IPaymentTermsAttributes, IPaymentTermsInput, IPaymentTermsOutput }

