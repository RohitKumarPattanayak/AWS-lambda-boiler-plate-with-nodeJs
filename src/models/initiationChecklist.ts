import { DataTypes, Model } from 'sequelize'
import { IInitiationChecklistAttributes } from '../interfaces/initiationChecklist'
import { connection } from '../config/mysql'
import ServiceCatalog from './serviceCatalog'

class InitiationCheckList extends Model<IInitiationChecklistAttributes> implements IInitiationChecklistAttributes {
    public id!: number
    public service_id!: number
    public checklist: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    static associate(models: any) {}
}

InitiationCheckList.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        service_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        checklist: {
            type: DataTypes.STRING(100)
        }
    },
    {
        modelName: 'InitiationCheckList',
        tableName: 'initialion_checklist',
        timestamps: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

ServiceCatalog.hasMany(InitiationCheckList, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

InitiationCheckList.belongsTo(ServiceCatalog, {
    foreignKey: 'service_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
export default InitiationCheckList

