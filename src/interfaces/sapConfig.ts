import { Optional } from 'sequelize'

interface ISapConfigAttributes {
    monthly_emp_max_hrs: number
    monthly_emp_max_alert_hrs: number
    site_coverage_limit_meters: number
    regular_hrs_max: string
    vat_percentage: number
    id: number
    payment_terms: object
    created_at?: Date
    updated_at?: Date
}

interface ISapConfigInput extends Optional<ISapConfigAttributes, 'id'> {}

interface ISapConfigOutput extends Required<ISapConfigAttributes> {}

export { ISapConfigAttributes, ISapConfigInput, ISapConfigOutput }

