import { Optional } from 'sequelize'

interface IInitiationChecklistAttributes {
    id: number
    service_id: number
    checklist: string
}

interface IInitiationChecklistInput extends Optional<IInitiationChecklistAttributes, 'id'> {}
interface IInitiationChecklistOutput extends Required<IInitiationChecklistAttributes> {}

export { IInitiationChecklistAttributes, IInitiationChecklistInput, IInitiationChecklistOutput }
