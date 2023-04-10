import { Optional } from 'sequelize'


interface IPublicHolidaysAttributes {
    id : number
    title : string
    date : Date
}

interface IPublicHolidaysInput extends Optional<IPublicHolidaysAttributes, 'id'> {}
interface IPublicHolidaysOutput extends Required<IPublicHolidaysAttributes> {}


export { IPublicHolidaysAttributes, IPublicHolidaysInput, IPublicHolidaysOutput }