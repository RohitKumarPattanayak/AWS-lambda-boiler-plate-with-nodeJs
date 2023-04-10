import { Optional } from 'sequelize'

interface IJobAttributes {
    id: number
    sap_job_code: string
    sap_site_code: string
    is_oneoff_job: number
    status_code: string
    sap_quote_id: string
    division_id: string
    is_location_enable: number
    spc_form_url: string
    DivisionMaster?: object
    start_date: string
    end_date: string
    catering_type: string
    payment_terms_code: string
    updatedAt?: Date
    createdAt?: Date
}

interface IJobInput extends Optional<IJobAttributes, 'id'> {}
interface IJobOutput extends Required<IJobAttributes> {}

export { IJobAttributes, IJobInput, IJobOutput }

