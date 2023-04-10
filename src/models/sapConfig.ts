import { DataTypes, Model } from 'sequelize'
import { ISapConfigAttributes } from '../interfaces/sapConfig'
import { connection } from '../config/mysql'

class SapConfig extends Model<ISapConfigAttributes> implements ISapConfigAttributes {
    public monthly_emp_max_hrs: number
    public monthly_emp_max_alert_hrs: number
    public site_coverage_limit_meters: number
    public regular_hrs_max: string
    public vat_percentage: number
    public id: number
    public payment_terms: object

    // timestamps!
    public readonly created_at!: Date
    public readonly updated_at!: Date
}

SapConfig.init(
    {
        monthly_emp_max_hrs: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        monthly_emp_max_alert_hrs: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        site_coverage_limit_meters: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        regular_hrs_max: {
            type: DataTypes.STRING(6),
            allowNull: true
        },
        vat_percentage: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        payment_terms: {
            type: DataTypes.JSON,
            allowNull: true
        }
    },
    {
        modelName: 'SapConfig',
        tableName: 'sap_config',
        timestamps: true,
        underscored: true,
        comment: '',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize: connection
    }
)

export default SapConfig

