import { DataTypes, Model } from 'sequelize'
import { IMaterialMasterAttributes } from '../interfaces/materialMaster'
import { connection } from '../config/mysql'
import DivisionMaster from './divisionMaster'

class MaterialMaster extends Model<IMaterialMasterAttributes> implements IMaterialMasterAttributes {
    public material_code!: string
    public material_name: string
    public is_active: number
    public unit_descriptor: string
    public division_id: number
    public price: number
    public image_url: string
    public type!: string

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date

    static associate(models: any) {}
}

MaterialMaster.init(
    {
        material_code: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        material_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        is_active: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        unit_descriptor: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        division_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('man-power', 'material', 'equipment'),
            allowNull: false
        }
    },

    {
        modelName: 'MaterialMaster',
        tableName: 'sap_material_master',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)
DivisionMaster.hasMany(MaterialMaster, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})
MaterialMaster.belongsTo(DivisionMaster, {
    foreignKey: 'division_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

export default MaterialMaster

