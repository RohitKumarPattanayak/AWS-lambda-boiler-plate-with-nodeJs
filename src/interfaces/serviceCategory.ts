import { Optional } from 'sequelize'


interface IServiceCategoryAttributes {
   id : number
   category_code: string
   category_name: string
   display_position: number
   parent_category_code: string

}

interface IServiceCategoryInput extends Optional<IServiceCategoryAttributes, 'id'> {}
interface IServiceCategoryOutput extends Required<IServiceCategoryAttributes> {}


export { IServiceCategoryAttributes, IServiceCategoryInput, IServiceCategoryOutput }